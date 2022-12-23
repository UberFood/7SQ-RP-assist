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
var NEXT_ROUND_BUTTON_SELECTOR = '[data-name="next_round_button"]';
var BATTLE_MOD_BUTTON_SELECTOR = '[data-name="battle_mod_button"]';
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
var skill_list = [];

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";
var FOG_IMAGE = "./images/fog.webp";
var QUESTION_IMAGE = "./images/question.jpg";

var MAX_ZONES = 25;
var CHAT_CASH = 10;

var stamina_weakspot_cost = 1;
var stamina_move_cost = 1;
var stamina_attack_cost = 1;
var stamina_cut_limb_cost = 3;
var shield_up_stamina_cost = 2;

var cooldown_cut_limb = 1;
var cooldown_big_bro = 1;

var shield_up_KD = 3;

// This is a constant, will be moved to database later
var HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
var stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
var strength_damage_map = [-2, 0, 1, 2, 3, 5, 7, 10, 13, 17, 21];
var move_action_map = [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3];
var bonus_action_map = [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3];
var main_action_map = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2];

var game_state = { board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [] };
var character_state = { HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], KD_points: [], current_weapon: [], visibility: [], attack_bonus: [], damage_bonus: [], bonus_KD: [], special_effects: [] };

var character_base = [];
var obstacle_base = [];

var gm_control_mod = 0; // normal mode
var battle_mod = 0;

var field_chosen = 0;
var chosen_index = void 0;
var chosen_character_index = void 0;

var attack = { in_process: 0, weapon_id: 0, attacker_id: 0, attacker_position: 0 };
var targeted_skill = { in_process: 0, skill_id: 0, attacker_id: 0, attacker_position: 0 };

var last_obstacle = 1;

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

function construct_board(new_game_state) {
  game_state.board_state = new_game_state.board_state;
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
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
          if (role == 'gm') {
            add_object(index);
          }
        } else {
          perform_skill(index, cell);
        }
      } else {
        stop_attack();
      }
    } else {
      move_character(index, cell);
    }
  } else if (game_state.board_state[index] > 0) {
    // character clicked
    if (field_chosen == 0) {
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
          select_character(index, cell);
        } else {
          perform_skill(index, cell);
        }
      } else {
        perform_attack(index, cell);
      }
    } else {
      undo_selection();
    }
  } else {
    // obstacle clicked
    if (field_chosen == 0) {
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
          select_obstacle(index, cell);
        } else {
          stop_skill();
        }
      } else {
        stop_attack();
      }
    } else {
      undo_selection();
    }
  }
}

function isInRange(index1, index2, range) {
  var x1 = Math.floor(index1 / game_state.size);
  var y1 = index1 % game_state.size;

  var x2 = Math.floor(index2 / game_state.size);
  var y2 = index2 % game_state.size;

  var distance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  return distance <= range * range;
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
  var character_number = game_state.board_state[index];
  var character = character_detailed_info[character_number];

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

  container.appendChild(name_display);
  container.appendChild(avatar_display);

  if (my_role == "gm" || character_state.visibility[character_number] == 1) {

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

    var tired_display = document.createElement("h2");
    tired_display.id = "tired_display";
    tired_display.innerHTML = "Выносливость: " + character_state.stamina[character_number];

    var initiative_display = document.createElement("h2");
    initiative_display.innerHTML = "Инициатива: " + character_state.initiative[character_number];

    container.appendChild(strength_display);
    container.appendChild(stamina_display);
    container.appendChild(agility_display);
    container.appendChild(intelligence_display);
    container.appendChild(KD_display);
    container.appendChild(HP_display);
    container.appendChild(tired_display);
    container.appendChild(initiative_display);

    var move_button = document.createElement("button");
    move_button.innerHTML = "Перемещение";
    move_button.index = index;
    move_button.cell = cell;
    move_button.onclick = function (event) {
      var character_picked = event.target;
      var character_number = game_state.board_state[character_picked.index];
      var move_actions_left = character_state.move_action[character_number];
      if (move_actions_left > 0) {
        var container = document.getElementById("character-info-container");
        container.innerHTML = "";
        var weapon_container = document.getElementById("weapon-info-container");
        weapon_container.innerHTML = "";
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
        delete_object(event);
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

    var default_weapon_index = character_state.current_weapon[character_number];
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

    var attack_button = document.createElement("button");
    attack_button.innerHTML = "Атаковать";
    attack_button.onclick = function (event) {
      var main_actions_left = character_state.main_action[character_number];
      if (main_actions_left > 0) {
        attack.in_process = 1;
        attack.weapon_id = character_state.current_weapon[character_number];
        attack.attacker_id = character_number;
        attack.attacker_position = index;
        field_chosen = 0;
        targeted_skill.in_process = 0;

        cell.src = "./images/attack_placeholder.jpg";
      } else {
        alert("У вас не осталось действий!");
      }
    };

    var skill_select = document.createElement("select");
    skill_select.id = "skill_chosen";

    var skillset = character.skillset;

    for (var _i = 0; _i < skillset.length; _i++) {
      var current_option = document.createElement("option");
      current_option.innerHTML = skill_list[skillset[_i]];
      current_option.value = skillset[_i];
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

    container.appendChild(button_list);
  }

  tiny_animation(container);
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
  return intelligence + roll_x(20) + mod;
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
  attack.in_process = 0;
  targeted_skill.in_process = 0;
  chosen_index = index;
  chosen_character_index = game_state.board_state[index];
  cell.src = "./images/loading.webp";
}

function undo_selection() {
  field_chosen = 0;
  var old_cell = document.getElementById("cell_" + chosen_index);
  old_cell.src = character_detailed_info[chosen_character_index].avatar;
}

function stop_attack() {
  attack.in_process = 0;
  var old_cell = document.getElementById("cell_" + attack.attacker_position);
  old_cell.src = character_detailed_info[attack.attacker_id].avatar;
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
    fog_state: game_state.fog_state,
    zone_state: game_state.zone_state,
    search_modificator_state: game_state.search_modificator_state,
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

function start_new_round() {
  var toSend = {};
  toSend.command = 'new_round';
  toSend.room_number = my_room;
  _wsClient2.default.sendMessage(toSend);
}

function perform_attack(index, cell) {
  var weapon = weapon_detailed_info[attack.weapon_id];

  if (isInRange(index, attack.attacker_position, weapon.range)) {

    var target_character_number = game_state.board_state[index];
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
    var target_character = character_detailed_info[target_character_number];
    var attacking_character = character_detailed_info[attack.attacker_id];
    var attack_roll = roll_x(20);

    var toSend = {};
    toSend.command = 'resolve_attack';
    toSend.room_number = my_room;
    toSend.attacker_id = attack.attacker_id;
    toSend.target_id = target_character_number;

    if (attack_roll < 20) {
      // no crit
      if (weapon.type == "ranged") {
        var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence);
      } else if (weapon.type == "melee") {
        var cumulative_attack_roll = attack_roll + parseInt(attacking_character.agility);
      }

      var attack_bonus = character_state.attack_bonus[attack.attacker_id];
      console.log(attack_bonus);
      cumulative_attack_roll = cumulative_attack_roll + attack_bonus;

      toSend.attack_roll = cumulative_attack_roll;

      if (cumulative_attack_roll > target_character_KD) {
        // Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility);
          toSend.evade_roll = evade_roll;
          if (evade_roll > cumulative_attack_roll) {
            //succesfully evaded
            toSend.outcome = "evaded";
          } else {
            var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number);
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_after_evasion";
          }
        } else {
          var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number);
          toSend.damage_roll = damage_roll;
          toSend.outcome = "damage_without_evasion";
        }
      } else {
        toSend.outcome = "KD_block";
      }
    } else {
      // full crit
      toSend.attack_roll = attack_roll;
      var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number);
      toSend.damage_roll = damage_roll;
      toSend.outcome = "full_crit";
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
            for (var _i4 = 0; _i4 < weapon.damage[0]; _i4++) {
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
      for (var _i5 = 0; _i5 < weapon.damage[0]; _i5++) {
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

function stop_skill() {
  targeted_skill.in_process = 0;
  var old_cell = document.getElementById("cell_" + targeted_skill.attacker_position);
  old_cell.src = character_detailed_info[targeted_skill.attacker_id].avatar;
}

function weak_spot(index, cell) {
  var target_character_number = game_state.board_state[index];
  var attacking_character = character_detailed_info[targeted_skill.attacker_id];

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = targeted_skill.skill_id;
  toSend.room_number = my_room;
  toSend.attacker_id = targeted_skill.attacker_id;
  toSend.target_id = target_character_number;

  var int_check = roll_x(20) + parseInt(attacking_character.intelligence);
  if (int_check >= 15) {
    toSend.outcome = "success";
  } else {
    toSend.outcome = "fail";
  }

  _wsClient2.default.sendMessage(toSend);
}

function heal(index, cell) {
  var target_character_number = game_state.board_state[index];
  var healer_character = character_detailed_info[targeted_skill.attacker_id];
  var target_character = character_detailed_info[target_character_number];

  var target_hp = character_state.HP[target_character_number];
  var target_full_hp = HP_values[target_character.stamina];
  var ratio = parseFloat(target_hp) / parseFloat(target_full_hp);

  var heal_roll = roll_x(20) + parseInt(healer_character.intelligence);
  if (healer_character.special_type == "med") {
    heal_roll = heal_roll + parseInt(healer_character.intelligence);
  }
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = targeted_skill.skill_id;
  toSend.room_number = my_room;
  toSend.healer_id = targeted_skill.attacker_id;
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
}

function big_bro(index, cell) {
  var target_character_number = game_state.board_state[index];

  var shield_KD = parseInt(character_state.KD_points[targeted_skill.attacker_id]) + parseInt(character_state.bonus_KD[targeted_skill.attacker_id]);
  var target_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);

  var bonus_KD = Math.max(shield_KD - target_KD, 0);

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = targeted_skill.skill_id;
  toSend.room_number = my_room;
  toSend.shield_id = targeted_skill.attacker_id;
  toSend.target_id = target_character_number;
  toSend.bonus_KD = bonus_KD;
  _wsClient2.default.sendMessage(toSend);
}

// increase attack roll by agility bonus (2*mod)
function cut_limbs(index, cell) {
  var weapon = weapon_detailed_info[character_state.current_weapon[targeted_skill.attacker_id]];
  var cut_range = 1;

  if (isInRange(index, targeted_skill.attacker_position, cut_range)) {

    var target_character_number = game_state.board_state[index];
    var target_character_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number]);
    var target_character = character_detailed_info[target_character_number];
    var attacking_character = character_detailed_info[targeted_skill.attacker_id];
    var attack_roll = roll_x(20);

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = targeted_skill.skill_id;
    toSend.room_number = my_room;
    toSend.attacker_id = targeted_skill.attacker_id;
    toSend.target_id = target_character_number;

    if (attack_roll < 20) {
      // no crit
      var cumulative_attack_roll = attack_roll + 2 * parseInt(attacking_character.agility);

      var attack_bonus = character_state.attack_bonus[targeted_skill.attacker_id];
      cumulative_attack_roll = cumulative_attack_roll + attack_bonus;

      toSend.attack_roll = cumulative_attack_roll;

      if (cumulative_attack_roll > target_character_KD) {
        // Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility);
          toSend.evade_roll = evade_roll;
          if (evade_roll > cumulative_attack_roll) {
            //succesfully evaded
            toSend.outcome = "evaded";
          } else {
            var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number);
            var flat_damage = damage_roll - strength_damage_map[parseInt(character_detailed_info[targeted_skill.attacker_id].strength)] - character_state.damage_bonus[targeted_skill.attacker_id];
            var full_damage = weapon.damage[1] * weapon.damage[0];
            if (flat_damage > full_damage / 3) {
              toSend.skill_outcome = "success";
            } else {
              toSend.skill_outcome = "fail";
            }
            toSend.damage_roll = damage_roll;
            toSend.outcome = "damage_after_evasion";
          }
        } else {
          var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number);
          var flat_damage = damage_roll - strength_damage_map[parseInt(character_detailed_info[targeted_skill.attacker_id].strength)] - character_state.damage_bonus[targeted_skill.attacker_id];
          var full_damage = weapon.damage[1] * weapon.damage[0];
          if (flat_damage > full_damage / 3) {
            toSend.skill_outcome = "success";
          } else {
            toSend.skill_outcome = "fail";
          }
          toSend.damage_roll = damage_roll;
          toSend.outcome = "damage_without_evasion";
        }
      } else {
        toSend.outcome = "KD_block";
      }
    } else {
      // full crit
      toSend.attack_roll = attack_roll;
      var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number);
      toSend.skill_outcome = "success";
      toSend.damage_roll = damage_roll;
      toSend.outcome = "full_crit";
    }
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато...");
  }
}

function devour(index, cell) {
  if (isInRange(index, targeted_skill.attacker_position, 1)) {
    var target_character_number = game_state.board_state[index];
    var stacks = 0;
    if (character_state.special_effects[target_character_number].hasOwnProperty("Markus_stacks")) {
      stacks = character_state.special_effects[target_character_number].Markus_stacks;
    }
    var damage = stacks * 5 + roll_x(10);
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = targeted_skill.skill_id;
    toSend.room_number = my_room;
    toSend.attacker_id = targeted_skill.attacker_id;
    toSend.target_id = target_character_number;
    toSend.damage = damage;
    _wsClient2.default.sendMessage(toSend);
  } else {
    alert("Далековато");
  }
}

function absolute_recovery(index, cell) {
  if (isInRange(index, targeted_skill.attacker_position, 1)) {
    var target_character_number = game_state.board_state[index];
    var heal_amount = 0;

    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      heal_amount = parseInt(damage_field.value);
    }

    var biopool = 0;
    if (character_state.special_effects[targeted_skill.attacker_id].hasOwnProperty("biopool")) {
      biopool = character_state.special_effects[targeted_skill.attacker_id].biopool;
    }

    if (heal_amount > 0 && biopool >= heal_amount) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = targeted_skill.skill_id;
      toSend.room_number = my_room;
      toSend.healer_id = targeted_skill.attacker_id;
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

function perform_skill(index, cell) {
  switch (targeted_skill.skill_id) {
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
        toSend.character_number = character_number;
        _wsClient2.default.sendMessage(toSend);
      } else {
        alert("Не хватает действий!");
      }
      break;
    case 1:
      //Прилив Адреналина
      if (character_state.special_effects[character_number].hasOwnProperty("adrenaline")) {
        alert("Умение все еще на кулдауне");
      } else {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index;
        toSend.character_number = character_number;
        var extra_actions = roll_x(4);
        var minus_actions = roll_x(4);
        toSend.extra_actions = extra_actions;
        toSend.minus_actions = minus_actions;
        _wsClient2.default.sendMessage(toSend);
      }
      break;
    case 2:
      // Подрезать сухожилия
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 3:
      // Слабое место
      if (character_state.bonus_action[character_number] > 0) {
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 4:
      // Лечение
      if (character_state.bonus_action[character_number] > 0) {
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
      } else {
        alert("Не хватает действий!");
      }
      break;

    case 5:
      // Большой брат
      if (character_state.bonus_action[character_number] > 0) {
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
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
        toSend.character_number = character_number;

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
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
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
        field_chosen = 0;
        attack.in_process = 0;
        targeted_skill.in_process = 1;
        targeted_skill.skill_id = skill_index;
        targeted_skill.attacker_id = character_number;
        targeted_skill.attacker_position = position;
        cell.src = "./images/Chidori.webp";
      } else {
        alert("Не хватает действий!");
      }
      break;

    default:
      alert("Не знаем это умение");
  }
}

function change_battle_mod() {
  if (battle_mod == 1) {
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
        next_round_button.show();
        battle_mod_button.show();
      }
      character_list = data.character_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list;
      weapon_detailed_info = data.weapon_detailed_info;
      skill_list = data.skill_list;
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
      character_state.HP[data.character_number] = HP_values[character.stamina];
      character_state.stamina[data.character_number] = stamina_values[character.stamina];
      character_state.move_action[data.character_number] = move_action_map[character.agility];
      character_state.bonus_action[data.character_number] = bonus_action_map[character.agility];
      character_state.main_action[data.character_number] = main_action_map[character.agility];
      character_state.initiative[data.character_number] = character.agility;
      character_state.KD_points[data.character_number] = character.KD_points;
      character_state.bonus_KD[data.character_number] = 0;
      character_state.can_evade[data.character_number] = 1;
      character_state.visibility[data.character_number] = 0;
      character_state.current_weapon[data.character_number] = character.inventory[0];
      character_state.attack_bonus[data.character_number] = 0;
      character_state.damage_bonus[data.character_number] = 0;
      character_state.special_effects[data.character_number] = {};
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

      if (battle_mod == 1) {
        character_state.stamina[data.character_number] = character_state.stamina[data.character_number] - stamina_move_cost;
        character_state.move_action[data.character_number] = character_state.move_action[data.character_number] - 1;
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

      if (!(my_role == 'player' && game_state.fog_state[to_index] == 1)) {
        var to_cell = document.getElementById('cell_' + to_index);
        to_cell.src = data.character_avatar;
      }

      game_state.board_state[from_index] = 0;
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
      character_state.initiative = data.initiative_state;
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
    } else if (data.command == 'change_character_visibility_response') {
      character_state.visibility[data.character_number] = data.new_value;
    } else if (data.command == 'simple_roll_response') {
      var message = data.character_name + " бросает " + data.roll;
      pushToList(message);
    } else if (data.command == 'skill_response') {
      switch (data.skill_index) {
        case 0:
          character = character_detailed_info[data.character_number];
          character_state.bonus_action[data.character_number] = character_state.bonus_action[data.character_number] - 1;
          character_state.move_action[data.character_number] = character_state.move_action[data.character_number] + 1;
          var message = character.name + " совершает рывок";
          pushToList(message);
          break;
        case 1:
          character = character_detailed_info[data.character_number];
          var extra_actions = data.extra_actions;
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[data.character_number] = character_state.move_action[data.character_number] + 1;
            } else {
              character_state.main_action[data.character_number] = character_state.main_action[data.character_number] + 1;
            }
            extra_actions = extra_actions - 1;
          }
          var adrenaline_object = {};
          adrenaline_object.cooldown = 3;
          adrenaline_object.minus_actions = data.minus_actions;
          character_state.special_effects[data.character_number].adrenaline = adrenaline_object;
          var message = character.name + " использует прилив адреналина и получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход.";
          pushToList(message);
          break;
        case 2:
          var attacker = character_detailed_info[data.attacker_id];
          var target = character_detailed_info[data.target_id];
          if (battle_mod == 1) {
            character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_cut_limb_cost;
            character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1;
            character_state.bonus_action[data.attacker_id] = character_state.bonus_action[data.attacker_id] - 1;
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
              character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
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
              character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
              character_state.can_evade[data.target_id] = 0;
              break;
            case "full_crit":
              var limb_cut_object = {};
              limb_cut_object.cooldown = cooldown_cut_limb + 1;
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object;
              character_state.move_action[data.target_id] = -10;
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона.";
              pushToList(message);
              character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
              break;
            default:
              console.log("fucked up resolving damage");
              break;
          }
          break;
        case 3:
          var attacker = character_detailed_info[data.attacker_id];
          character_state.bonus_action[data.attacker_id] = character_state.bonus_action[data.attacker_id] - 1;
          character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_weakspot_cost;
          var target = character_detailed_info[data.target_id];
          if (data.outcome = "success") {
            var weakspot_object = {};
            weakspot_object.hunter_id = data.attacker_id;
            character_state.special_effects[data.target_id].weakspot = weakspot_object;
            var message = attacker.name + " успешно обнаружил слабое место " + target.name;
          } else {
            var message = attacker.name + " не удалось обнаружить слабое место " + target.name;
          }
          pushToList(message);
          break;

        case 4:
          var healer = character_detailed_info[data.healer_id];
          var target = character_detailed_info[data.target_id];
          character_state.bonus_action[data.healer_id] = character_state.bonus_action[data.healer_id] - 1;
          character_state.stamina[data.healer_id] = character_state.stamina[data.healer_id] - 1;
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
          character_state.bonus_action[data.shield_id] = character_state.bonus_action[data.shield_id] - 1;
          character_state.stamina[data.shield_id] = character_state.stamina[data.shield_id] - 1;
          var shield = character_detailed_info[data.shield_id];
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
          var shield = character_detailed_info[data.character_number];
          character_state.main_action[data.character_number] = character_state.main_action[data.character_number] - 1;
          if (data.outcome == "shield_up") {
            character_state.bonus_KD[data.character_number] = character_state.bonus_KD[data.character_number] + shield_up_KD;
            var shield_up_object = {};
            shield_up_object.stamina_cost = shield_up_stamina_cost;
            shield_up_object.KD = shield_up_KD;
            character_state.special_effects[data.character_number].shield_up = shield_up_object;
            var message = shield.name + " поднял щиты за чат";
            pushToList(message);
          } else {
            character_state.bonus_KD[data.character_number] = character_state.bonus_KD[data.character_number] - shield_up_KD;
            delete character_state.special_effects[data.character_number].shield_up;
            var message = shield.name + " опустил щит. Чат прости(";
            pushToList(message);
          }
          break;
        case 7:
          var attacker = character_detailed_info[data.attacker_id];
          var target = character_detailed_info[data.target_id];
          character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1;
          character_state.bonus_action[data.attacker_id] = character_state.bonus_action[data.attacker_id] - 1;

          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage;
          if (character_state.special_effects[data.target_id].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[data.target_id].Markus_stacks = character_state.special_effects[data.target_id].Markus_stacks + 2;
          } else {
            character_state.special_effects[data.target_id].Markus_stacks = 2;
          }
          if (character_state.special_effects[data.attacker_id].hasOwnProperty("biopool")) {
            character_state.special_effects[data.attacker_id].biopool = character_state.special_effects[data.attacker_id].biopool + data.damage;
          } else {
            character_state.special_effects[data.attacker_id].biopool = data.damage;
          }
          var message = attacker.name + " наносит " + target.name + " " + data.damage + " урона от которого невозможно увернуться";
          pushToList(message);
          break;
        case 9:
          var healer = character_detailed_info[data.healer_id];
          var target = character_detailed_info[data.target_id];
          character_state.bonus_action[data.healer_id] = character_state.bonus_action[data.healer_id] - 1;
          character_state.stamina[data.healer_id] = character_state.stamina[data.healer_id] - 1;

          character_state.HP[data.target_id] = character_state.HP[data.target_id] + data.heal_amount;
          character_state.special_effects[data.healer_id].biopool = character_state.special_effects[data.healer_id].biopool - data.heal_amount;
          var message = healer.name + " воостаналивает " + target.name + " " + data.heal_amount + " хп";
          pushToList(message);
          break;

        default:
          alert("Received unknown skill command");
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!";
      pushToList(message);
      for (var i = 1; i < character_state.can_evade.length; i++) {
        character = character_detailed_info[i];
        if (character !== undefined) {
          character_state.can_evade[i] = 1;
          character_state.move_action[i] = move_action_map[character.agility];
          character_state.bonus_action[i] = bonus_action_map[character.agility];
          character_state.main_action[i] = main_action_map[character.agility];
          if (character_state.special_effects[i].hasOwnProperty("adrenaline")) {
            if (character_state.special_effects[i].adrenaline.cooldown == 3) {
              var minus_actions = character_state.special_effects[i].adrenaline.minus_actions;
              while (minus_actions > 0) {
                if (minus_actions % 2 == 0) {
                  character_state.move_action[i] = character_state.move_action[i] - 1;
                } else {
                  character_state.main_action[i] = character_state.main_action[i] - 1;
                }
                minus_actions = minus_actions - 1;
              }
            }
            character_state.special_effects[i].adrenaline.cooldown = character_state.special_effects[i].adrenaline.cooldown - 1;
            if (character_state.special_effects[i].adrenaline.cooldown == 0) {
              delete character_state.special_effects[i].adrenaline;
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно.";
              pushToList(message);
            }
          }
          if (character_state.special_effects[i].hasOwnProperty("cut_limb")) {
            character_state.move_action[i] = -10;
            character_state.special_effects[i].cut_limb.cooldown = character_state.special_effects[i].cut_limb.cooldown - 1;
            if (character_state.special_effects[i].cut_limb.cooldown == 0) {
              delete character_state.special_effects[i].cut_limb;
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу.";
              pushToList(message);
            }
          }
          if (character_state.special_effects[i].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[i].Markus_stacks = character_state.special_effects[i].Markus_stacks - 1;
            if (character_state.special_effects[i].Markus_stacks == 0) {
              delete character_state.special_effects[i].Markus_stacks;
            }
          }

          if (character_state.special_effects[i].hasOwnProperty("shield_up")) {
            character_state.stamina[i] = character_state.stamina[i] - character_state.special_effects[i].shield_up.stamina_cost;
            var message = character.name + " продолжает держать щит (спасибо)";
            pushToList(message);
          }
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
      }
    } else if (data.command == 'battle_mod_response') {
      battle_mod = data.value;
      if (battle_mod == 0) {
        var message = "Бой окончен! Наступил мир во всем мире";
      } else {
        var message = "Начало боя! Люди умирают, если их убить";
      }
      pushToList(message);
    } else if (data.command == 'resolve_attack_response') {
      var attacker = character_detailed_info[data.attacker_id];
      var target = character_detailed_info[data.target_id];
      if (battle_mod == 1) {
        character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_attack_cost;
        character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1;
      }
      switch (data.outcome) {
        case "KD_block":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню.";
          pushToList(message);
          break;
        case "evaded":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ").";
          pushToList(message);
          if (target.special_type != 'rogue') {
            character_state.can_evade[data.target_id] = 0;
          }
          break;
        case "damage_without_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона.";
          pushToList(message);
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
          break;
        case "damage_after_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона.";
          pushToList(message);
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
          character_state.can_evade[data.target_id] = 0;
          break;
        case "full_crit":
          var message = attacker.name + " критически атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона.";
          pushToList(message);
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll;
          break;
        default:
          console.log("fucked up resolving damage");
          break;
      }
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

var next_round_button = $(NEXT_ROUND_BUTTON_SELECTOR);
next_round_button.on('click', start_new_round);
next_round_button.hide();

var battle_mod_button = $(BATTLE_MOD_BUTTON_SELECTOR);
battle_mod_button.on('click', change_battle_mod);
battle_mod_button.hide();

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
for (var _i6 = 0; _i6 < CHAT_CASH; _i6++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + _i6);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvZ2FtZS5qcyIsImFwcC9zY3JpcHRzL3NyYy93cy1jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxJQUFJLElBQUksT0FBTyxNQUFmOztBQUVBLElBQUksK0JBQStCLG1DQUFuQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksa0NBQWtDLHNDQUF0QztBQUNBLElBQUksc0JBQXNCLDBCQUExQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUkseUJBQXlCLDZCQUE3QjtBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksNkJBQTZCLGlDQUFqQztBQUNBLElBQUksMkJBQTJCLCtCQUEvQjtBQUNBLElBQUksNkJBQTZCLGlDQUFqQzs7QUFFQSxJQUFJLHVCQUF1QixrQ0FBM0I7QUFDQSxJQUFJLDhCQUE4QixrQ0FBbEM7O0FBRUEsSUFBSSw0QkFBNEIsZ0NBQWhDO0FBQ0EsSUFBSSwyQkFBMkIsK0JBQS9COztBQUVBLElBQUksOEJBQThCLGtDQUFsQzs7QUFFQSxJQUFJLGlCQUFpQixTQUFTLE1BQVQsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsRUFBaUMsSUFBakMsQ0FBckI7O0FBRUEsSUFBSSxVQUFVLEtBQUssS0FBTCxDQUFXLGVBQWUsT0FBZixDQUF1QixVQUF2QixDQUFYLENBQWQ7QUFDQSxJQUFJLFVBQVUsS0FBSyxLQUFMLENBQVcsZUFBZSxPQUFmLENBQXVCLFdBQXZCLENBQVgsQ0FBZDtBQUNBLElBQUksVUFBVSxLQUFLLEtBQUwsQ0FBVyxlQUFlLE9BQWYsQ0FBdUIsYUFBdkIsQ0FBWCxDQUFkOztBQUVBLElBQUksaUJBQWlCLEVBQXJCO0FBQ0EsSUFBSSwwQkFBMEIsRUFB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LHNCQUFrQixJQUFsQjtBQUNELEdBSEQ7QUFJRDs7QUFFRCxTQUFTLFdBQVQsQ0FBcUIsT0FBckIsRUFBOEI7QUFDNUIsTUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxXQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxHQUZELE1BRU87QUFDTCxTQUFLLGNBQUw7QUFDQSwyQkFBdUIsaUJBQXZCO0FBQ0EsUUFBSSxPQUFPLFVBQVAsS0FBc0IsVUFBVSxJQUFwQyxFQUEwQztBQUN4QyxhQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRCxLQUZELE1BRU87QUFDTCxjQUFRLEdBQVIsQ0FBWSwyQkFBWjtBQUNEO0FBQ0Y7QUFDRjs7a0JBRWM7QUFDYixZQURhO0FBRWIsMENBRmE7QUFHYixnREFIYTtBQUliLDBCQUphO0FBS2IsOERBTGE7QUFNYjtBQU5hLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgc29ja2V0IGZyb20gJy4vd3MtY2xpZW50JztcclxuXHJcbnZhciAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbnZhciBDUkVBVEVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJjcmVhdGVfYm9hcmRfYnV0dG9uXCJdJztcclxudmFyIFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJzYXZlX2JvYXJkX2J1dHRvblwiXSc7XHJcbnZhciBMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibG9hZF9ib2FyZF9idXR0b25cIl0nO1xyXG52YXIgUk9MTF9JTklUSUFUSVZFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9sbF9pbml0aWF0aXZlX2J1dHRvblwiXSc7XHJcbnZhciBGT0dfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJmb2dfYnV0dG9uXCJdJztcclxudmFyIFpPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ6b25lX2J1dHRvblwiXSc7XHJcbnZhciBDSEFUX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY2hhdF9idXR0b25cIl0nO1xyXG52YXIgTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibWlycm9yX2J1dHRvblwiXSc7XHJcbnZhciBORVhUX1JPVU5EX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwibmV4dF9yb3VuZF9idXR0b25cIl0nO1xyXG52YXIgQkFUVExFX01PRF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImJhdHRsZV9tb2RfYnV0dG9uXCJdJztcclxudmFyIEZPR19aT05FX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZm9nX3pvbmVfYnV0dG9uXCJdJztcclxudmFyIFVORk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJ1bmZvZ196b25lX2J1dHRvblwiXSc7XHJcblxyXG52YXIgWk9ORV9OVU1CRVJfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInpvbmVfbnVtYmVyX3NlbGVjdFwiXSc7XHJcbnZhciBTRUFSQ0hfTU9ESUZJQ0FUT1JfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNlYXJjaF9tb2RpZmljYXRvclwiXSc7XHJcblxyXG52YXIgQk9BUkRfU0laRV9JTlBVVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiYm9hcmRfc2l6ZV9pbnB1dFwiXSc7XHJcbnZhciBTQVZFX05BTUVfSU5QVVRfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNhdmVfbmFtZV9pbnB1dFwiXSc7XHJcblxyXG52YXIgTk9USUZJQ0FUSU9OU19MSVNUX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RcIl0nO1xyXG5cclxudmFyIFNFUlZFUl9BRERSRVNTID0gbG9jYXRpb24ub3JpZ2luLnJlcGxhY2UoL15odHRwLywgJ3dzJyk7XHJcblxyXG52YXIgbXlfbmFtZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndXNlcm5hbWUnKSk7XHJcbnZhciBteV9yb2xlID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3JvbGUnKSk7XHJcbnZhciBteV9yb29tID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyb29tX251bWJlcicpKTtcclxuXHJcbnZhciBjaGFyYWN0ZXJfbGlzdCA9IFtdO1xyXG52YXIgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIG9ic3RhY2xlX2xpc3QgPSBbXTtcclxudmFyIG9ic3RhY2xlX2RldGFpbGVkX2luZm8gPSBbXTtcclxudmFyIHdlYXBvbl9saXN0ID0gW107XHJcbnZhciB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IFtdO1xyXG52YXIgc2tpbGxfbGlzdCA9IFtdO1xyXG5cclxudmFyIFRJTllfRUZGRUNUX0NMQVNTID0gJ2lzLXRpbnknO1xyXG5cclxudmFyIEVNUFRZX0NFTExfUElDID0gXCIuL2ltYWdlcy9zcXVhcmUuanBnXCI7XHJcbnZhciBGT0dfSU1BR0UgPSBcIi4vaW1hZ2VzL2ZvZy53ZWJwXCI7XHJcbnZhciBRVUVTVElPTl9JTUFHRSA9IFwiLi9pbWFnZXMvcXVlc3Rpb24uanBnXCI7XHJcblxyXG52YXIgTUFYX1pPTkVTID0gMjU7XHJcbnZhciBDSEFUX0NBU0ggPSAxMDtcclxuXHJcbnZhciBzdGFtaW5hX3dlYWtzcG90X2Nvc3QgPSAxXHJcbnZhciBzdGFtaW5hX21vdmVfY29zdCA9IDFcclxudmFyIHN0YW1pbmFfYXR0YWNrX2Nvc3QgPSAxXHJcbnZhciBzdGFtaW5hX2N1dF9saW1iX2Nvc3QgPSAzXHJcbnZhciBzaGllbGRfdXBfc3RhbWluYV9jb3N0ID0gMlxyXG5cclxudmFyIGNvb2xkb3duX2N1dF9saW1iID0gMVxyXG52YXIgY29vbGRvd25fYmlnX2JybyA9IDFcclxuXHJcbnZhciBzaGllbGRfdXBfS0QgPSAzXHJcblxyXG5cclxuLy8gVGhpcyBpcyBhIGNvbnN0YW50LCB3aWxsIGJlIG1vdmVkIHRvIGRhdGFiYXNlIGxhdGVyXHJcbmNvbnN0IEhQX3ZhbHVlcyA9IFsxNSwgMzAsIDQwLCA1NSwgNzUsIDEwMCwgMTMwLCAxNjUsIDIwNSwgMjUwLCAzMDAsIDM1NSwgNDE1XTtcclxuY29uc3Qgc3RhbWluYV92YWx1ZXMgPSBbMzAsIDQ1LCA2MCwgNzUsIDkwLCAxMDUsIDEyMCwgMTM1LCAxNTAsIDE2NSwgMTgwLCAxOTVdO1xyXG5jb25zdCBzdHJlbmd0aF9kYW1hZ2VfbWFwID0gWy0yLCAwLCAxLCAyLCAzLCA1LCA3LCAxMCwgMTMsIDE3LCAyMV1cclxuY29uc3QgbW92ZV9hY3Rpb25fbWFwID0gWzEsIDEsIDEsIDIsIDIsIDIsIDIsIDIsIDIsIDMsIDMsIDNdXHJcbmNvbnN0IGJvbnVzX2FjdGlvbl9tYXA9IFswLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAyLCAyLCAzXVxyXG5jb25zdCBtYWluX2FjdGlvbl9tYXAgPSBbMSwgMSwgMSwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMl1cclxuXHJcblxyXG5sZXQgZ2FtZV9zdGF0ZSA9IHtib2FyZF9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdfTtcclxubGV0IGNoYXJhY3Rlcl9zdGF0ZSA9IHtIUDogW10sIG1haW5fYWN0aW9uOiBbXSwgYm9udXNfYWN0aW9uOiBbXSwgbW92ZV9hY3Rpb246IFtdLCBzdGFtaW5hOiBbXSwgaW5pdGlhdGl2ZTogW10sIGNhbl9ldmFkZTogW10sIEtEX3BvaW50czogW10sIGN1cnJlbnRfd2VhcG9uOiBbXSwgdmlzaWJpbGl0eTogW10sIGF0dGFja19ib251czogW10sIGRhbWFnZV9ib251czogW10sIGJvbnVzX0tEOiBbXSwgc3BlY2lhbF9lZmZlY3RzOiBbXX1cclxuXHJcbmxldCBjaGFyYWN0ZXJfYmFzZSA9IFtdO1xyXG5sZXQgb2JzdGFjbGVfYmFzZSA9IFtdO1xyXG5cclxubGV0IGdtX2NvbnRyb2xfbW9kID0gMDsgLy8gbm9ybWFsIG1vZGVcclxubGV0IGJhdHRsZV9tb2QgPSAwXHJcblxyXG5sZXQgZmllbGRfY2hvc2VuID0gMDtcclxubGV0IGNob3Nlbl9pbmRleDtcclxubGV0IGNob3Nlbl9jaGFyYWN0ZXJfaW5kZXg7XHJcblxyXG5sZXQgYXR0YWNrID0ge2luX3Byb2Nlc3M6IDAsIHdlYXBvbl9pZDogMCwgYXR0YWNrZXJfaWQ6IDAsIGF0dGFja2VyX3Bvc2l0aW9uOiAwfTtcclxubGV0IHRhcmdldGVkX3NraWxsID0ge2luX3Byb2Nlc3M6IDAsIHNraWxsX2lkOiAwLCBhdHRhY2tlcl9pZDogMCwgYXR0YWNrZXJfcG9zaXRpb246IDB9XHJcblxyXG5cclxubGV0IGxhc3Rfb2JzdGFjbGUgPSAxO1xyXG5cclxuZnVuY3Rpb24gcmVjb25uZWN0KCkge1xyXG4gIGlmICghc29ja2V0LmlzUmVhZHkoKSkge1xyXG4gICAgc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG4gICAgc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXJEZWZhdWx0KCk7XHJcbiAgICBjb25zb2xlLmxvZygnSG9wZWZ1bGx5IHJlY29ubmVjdGVkIChwcmF5KScpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnV2FzIG9ubGluZSBhbnl3YXknKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkKCkge1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmRfc2l6ZVwiKS52YWx1ZTtcclxuICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlID0gW107XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnpvbmVfc3RhdGUgPSBbXTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSAqIGdhbWVfc3RhdGUuc2l6ZTsgaSsrKSB7XHJcbiAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZS5wdXNoKDApO1xyXG4gICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlLnB1c2goMCk7XHJcbiAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZS5wdXNoKDApO1xyXG4gIH1cclxuICBzZW5kX2NvbnN0cnVjdF9jb21tYW5kKGdhbWVfc3RhdGUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQm9hcmQoKSB7XHJcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcF9uYW1lXCIpLnZhbHVlO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdsb2FkX2dhbWUnO1xyXG4gIHRvU2VuZC5zYXZlX25hbWUgPSBuYW1lO1xyXG4gIHRvU2VuZC5mcm9tX25hbWUgPSBteV9uYW1lO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRfY29uc3RydWN0X2NvbW1hbmQobmV3X2dhbWVfc3RhdGUpIHtcclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnY29uc3RydWN0X2JvYXJkJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5nYW1lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpIHtcclxuICBpZiAobXlfcm9sZSA9PSAnZ20nKSB7XHJcbiAgICAvLyBnbSBzaWRlXHJcbiAgICBpZiAoZ21fY29udHJvbF9tb2QgPT0gMCkge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gbm9ybWFsIGFkZC9tb3ZlIGRlbGV0ZSBtb2RlXHJcbiAgICAgIHN0YW5kYXJkX2NlbGxfb25DbGljayhpbmRleCwgY2VsbCwgbXlfcm9sZSk7XHJcbiAgICB9IGVsc2UgaWYgKGdtX2NvbnRyb2xfbW9kID09IDEpIHtcclxuICAgICAgLy8gd2UgYXJlIGluIGZvZyBtb2RlXHJcbiAgICAgIGFwcGx5Rm9nKGluZGV4LCBjZWxsKTtcclxuICAgIH0gZWxzZSBpZiAoZ21fY29udHJvbF9tb2QgPT0gMikge1xyXG4gICAgICAvLyB3ZSBhcmUgaW4gem9uZXMgbW9kZVxyXG4gICAgICBhc3NpZ25ab25lKGluZGV4KTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcGxheWVyIHNpZGVcclxuICAgIGlmIChnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPT0gMSkge1xyXG4gICAgICAvLyBjbGlja2VkIGZvZ1xyXG4gICAgICBpZiAoZmllbGRfY2hvc2VuID09IDEpIHtcclxuICAgICAgICB1bmRvX3NlbGVjdGlvbigpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcgZm9nIGRldGVjdGVkJyk7XHJcbiAgICAgICAgZGlzcGxheUZvZygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIG15X3JvbGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29uc3RydWN0X2JvYXJkKG5ld19nYW1lX3N0YXRlKSB7XHJcbiAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLmJvYXJkX3N0YXRlO1xyXG4gIGdhbWVfc3RhdGUuc2l6ZSA9IG5ld19nYW1lX3N0YXRlLnNpemU7XHJcbiAgZ2FtZV9zdGF0ZS5mb2dfc3RhdGUgPSBuZXdfZ2FtZV9zdGF0ZS5mb2dfc3RhdGU7XHJcbiAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlID0gbmV3X2dhbWVfc3RhdGUuem9uZV9zdGF0ZTtcclxuICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZSA9IG5ld19nYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTtcclxuXHJcbiAgdmFyIGluZm9fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgaW5mb19jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIGJvYXJkX2NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQtY29udGFpbmVyXCIpO1xyXG4gIGJvYXJkX2NvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIHZhciBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuICAgIHZhciByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICByb3cuY2xhc3NOYW1lID0gXCJib2FyZF9yb3dcIjtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2FtZV9zdGF0ZS5zaXplOyBqKyspIHtcclxuICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgICAgIHZhciBjZWxsX2lkID0gaSAqIGdhbWVfc3RhdGUuc2l6ZSArIGo7XHJcbiAgICAgIGJ1dHRvbi5pZCA9IFwiY2VsbF9cIiArIGNlbGxfaWQ7XHJcbiAgICAgIGJ1dHRvbi5yb3cgPSBpO1xyXG4gICAgICBidXR0b24uY29sdW1uID0gajtcclxuICAgICAgdmFyIGltYWdlX25hbWUgPSBmb2dPclBpYyhjZWxsX2lkKTtcclxuICAgICAgYnV0dG9uLnNyYyA9IGltYWdlX25hbWU7XHJcbiAgICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcclxuICAgICAgYnV0dG9uLmNsYXNzTmFtZSA9ICdib2FyZF9jZWxsJztcclxuICAgICAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgIHZhciBpbmRleCA9IGNlbGwucm93ICogZ2FtZV9zdGF0ZS5zaXplICsgY2VsbC5jb2x1bW47XHJcblxyXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xyXG4gICAgICAgICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgICAgICAgIHRvU2VuZC5jZWxsX2lkID0gaW5kZXg7XHJcbiAgICAgICAgICB0b1NlbmQub2JzdGFjbGVfbnVtYmVyID0gbGFzdF9vYnN0YWNsZTtcclxuICAgICAgICAgIHRvU2VuZC5vYnN0YWNsZV9uYW1lID0gb2JzdGFjbGVfbGlzdFtsYXN0X29ic3RhY2xlIC0gMV07XHJcbiAgICAgICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5vX3NoaWZ0X29uY2xpY2sobXlfcm9sZSwgZ21fY29udHJvbF9tb2QsIGdhbWVfc3RhdGUsIGZpZWxkX2Nob3NlbiwgY2VsbCwgaW5kZXgpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfTtcclxuICAgICAgdmFyIGNlbGxfd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcclxuICAgICAgY2VsbF93cmFwLmFwcGVuZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgIGNlbGxfd3JhcC5jbGFzc05hbWUgPSBcImNlbGxfd3JhcFwiO1xyXG5cclxuICAgICAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHpvbmVfdGV4dC5pZCA9IFwiem9uZV90ZXh0X1wiICsgY2VsbF9pZDtcclxuICAgICAgem9uZV90ZXh0LmNsYXNzTmFtZSA9IFwiem9uZV90ZXh0XCI7XHJcbiAgICAgIGNlbGxfd3JhcC5hcHBlbmRDaGlsZCh6b25lX3RleHQpO1xyXG5cclxuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGxfd3JhcCk7XHJcbiAgICB9XHJcbiAgICBib2FyZC5hcHBlbmRDaGlsZChyb3cpO1xyXG4gIH1cclxuICBib2FyZF9jb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhc3NpZ25ab25lKGluZGV4KSB7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gem9uZV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG4gIHZhciBtb2RpZmljYXRvciA9IHNlYXJjaF9tb2RpZmljYXRvci52YWwoKTtcclxuXHJcbiAgdmFyIHpvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6b25lX3RleHRfJyArIGluZGV4KTtcclxuICB6b25lX3RleHQuaW5uZXJIVE1MID0gem9uZV9udW1iZXIgKyAnKCcgKyBtb2RpZmljYXRvciArICcpJztcclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2Fzc2lnbl96b25lJztcclxuICB0b1NlbmQuem9uZV9udW1iZXIgPSB6b25lX251bWJlcjtcclxuICB0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICB0b1NlbmQubW9kaWZpY2F0b3IgPSBtb2RpZmljYXRvcjtcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb2dPclBpYyhjZWxsX2lkKSB7XHJcbiAgdmFyIHBpY3R1cmVfbmFtZSA9IEZPR19JTUFHRTtcclxuICBpZiAoKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2NlbGxfaWRdICE9IDEpfHwobXlfcm9sZSA9PSAnZ20nKSkge1xyXG4gICAgcGljdHVyZV9uYW1lID0gZ2V0X29iamVjdF9waWN0dXJlKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbY2VsbF9pZF0pO1xyXG4gIH1cclxuICByZXR1cm4gcGljdHVyZV9uYW1lO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFuZGFyZF9jZWxsX29uQ2xpY2soaW5kZXgsIGNlbGwsIHJvbGUpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0gPT0gMCkgeyAvLyBlbXB0eSBjZWxsIGNsaWNrZWRcclxuXHRcdGlmIChmaWVsZF9jaG9zZW4gPT0gMCkge1xyXG4gICAgICBpZiAoYXR0YWNrLmluX3Byb2Nlc3MgPT0gMCkge1xyXG4gICAgICAgIGlmICh0YXJnZXRlZF9za2lsbC5pbl9wcm9jZXNzID09IDApIHtcclxuICAgICAgICAgIGlmIChyb2xlID09ICdnbScpIHtcclxuXHRcdFx0ICAgICAgIGFkZF9vYmplY3QoaW5kZXgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICB9IGVsc2Uge1xyXG4gICAgICAgc3RvcF9hdHRhY2soKVxyXG4gICAgIH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG1vdmVfY2hhcmFjdGVyKGluZGV4LCBjZWxsKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgaWYgKGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdID4gMCkgeyAvLyBjaGFyYWN0ZXIgY2xpY2tlZFxyXG5cdFx0aWYgKGZpZWxkX2Nob3NlbiA9PSAwKSB7XHJcbiAgICAgIGlmIChhdHRhY2suaW5fcHJvY2VzcyA9PSAwKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldGVkX3NraWxsLmluX3Byb2Nlc3MgPT0gMCkge1xyXG5cdFx0XHQgICAgIHNlbGVjdF9jaGFyYWN0ZXIoaW5kZXgsIGNlbGwpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwZXJmb3JtX3NraWxsKGluZGV4LCBjZWxsKVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwZXJmb3JtX2F0dGFjayhpbmRleCwgY2VsbClcclxuICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9IGVsc2UgeyAvLyBvYnN0YWNsZSBjbGlja2VkXHJcblx0XHRpZiAoZmllbGRfY2hvc2VuID09IDApIHtcclxuICAgICAgaWYgKGF0dGFjay5pbl9wcm9jZXNzID09IDApIHtcclxuICAgICAgICBpZiAodGFyZ2V0ZWRfc2tpbGwuaW5fcHJvY2VzcyA9PSAwKSB7XHJcblx0XHRcdCAgICAgc2VsZWN0X29ic3RhY2xlKGluZGV4LCBjZWxsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0b3BfYXR0YWNrKClcclxuICAgICAgfVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5kb19zZWxlY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5SYW5nZShpbmRleDEsIGluZGV4MiwgcmFuZ2UpIHtcclxuICB2YXIgeDEgPSBNYXRoLmZsb29yKGluZGV4MS9nYW1lX3N0YXRlLnNpemUpXHJcbiAgdmFyIHkxID0gaW5kZXgxICUgZ2FtZV9zdGF0ZS5zaXplXHJcblxyXG4gIHZhciB4MiA9IE1hdGguZmxvb3IoaW5kZXgyL2dhbWVfc3RhdGUuc2l6ZSlcclxuICB2YXIgeTIgPSBpbmRleDIgJSBnYW1lX3N0YXRlLnNpemVcclxuXHJcbiAgdmFyIGRpc3RhbmNlID0gKHgxLXgyKSooeDEteDIpICsgKHkxLXkyKSooeTEteTIpXHJcbiAgcmV0dXJuIGRpc3RhbmNlIDw9IHJhbmdlKnJhbmdlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJvbGxfeCh4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHgpICsgMVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gYXBwbHlGb2coaW5kZXgsIGNlbGwpIHtcclxuXHRpZiAoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbaW5kZXhdID09IDEpIHtcclxuXHRcdC8vIHNlbmQgdXBkYXRlIG1lc3NhZ2VcclxuXHRcdHZhciB0b1NlbmQgPSB7fTtcclxuXHRcdHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG5cdFx0dG9TZW5kLnVwZGF0ZV90eXBlID0gJ3JlbW92ZSc7XHJcblx0XHR0b1NlbmQuaW5kZXggPSBpbmRleDtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcblx0XHRzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gc2VuZCB1cGRhdGUgbWVzc2FnZVxyXG5cdFx0dmFyIHRvU2VuZCA9IHt9O1xyXG5cdFx0dG9TZW5kLmNvbW1hbmQgPSAndXBkYXRlX2ZvZyc7XHJcblx0XHR0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuXHRcdHRvU2VuZC5pbmRleCA9IGluZGV4O1xyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuXHRcdHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYWRkX29iamVjdChib2FyZF9pbmRleCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHdlYXBvbl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiKTtcclxuICB3ZWFwb25fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBidXR0b25fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBidXR0b25fY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYWRkLW9iamVjdC1idXR0b24tY29udGFpbmVyXCI7XHJcblxyXG4gIHZhciBidXR0b25fYWRkX2NoYXJhY3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uX2FkZF9jaGFyYWN0ZXIuaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMINC/0LXRgNGB0L7QvdCw0LbQsFwiO1xyXG4gIGJ1dHRvbl9hZGRfY2hhcmFjdGVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGFkZF9jaGFyYWN0ZXIoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIHZhciBidXR0b25fYWRkX29ic3RhY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b25fYWRkX29ic3RhY2xlLmlubmVySFRNTCA9IFwi0JTQvtCx0LDQstC40YLRjCDQv9GA0LXQv9GP0YLRgdGC0LLQuNC1XCI7XHJcbiAgYnV0dG9uX2FkZF9vYnN0YWNsZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICBhZGRfb2JzdGFjbGUoYm9hcmRfaW5kZXgpO1xyXG4gIH07XHJcblxyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9jaGFyYWN0ZXIpO1xyXG4gIGJ1dHRvbl9jb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uX2FkZF9vYnN0YWNsZSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9jb250YWluZXIpO1xyXG5cclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0aW55X2FuaW1hdGlvbihjb250YWluZXIpIHtcclxuICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChUSU5ZX0VGRkVDVF9DTEFTUyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFRJTllfRUZGRUNUX0NMQVNTKTtcclxuICB9LCA1MCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZF9vYnN0YWNsZShib2FyZF9pbmRleCkge1xyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2VsZWN0LmlkID0gXCJvYnN0YWNsZV9jaG9zZW5cIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYnN0YWNsZV9saXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgY3VycmVudF9vcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgY3VycmVudF9vcHRpb24uaW5uZXJIVE1MID0gb2JzdGFjbGVfbGlzdFtpXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gaTtcclxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChjdXJyZW50X29wdGlvbik7XHJcbiAgfVxyXG5cclxuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBidXR0b24uaW5uZXJIVE1MID0gXCLQlNC+0LHQsNCy0LjRgtGMXCI7XHJcbiAgYnV0dG9uLmJvYXJkX2luZGV4ID0gYm9hcmRfaW5kZXg7XHJcbiAgYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIGJ1dHRvbiA9IGV2ZW50LnRhcmdldDtcclxuICAgIHZhciBvYnN0YWNsZV9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic3RhY2xlX2Nob3NlblwiKS52YWx1ZSk7XHJcblxyXG4gICAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gICAgdG9TZW5kLmNvbW1hbmQgPSAnYWRkX29ic3RhY2xlJztcclxuICAgIHRvU2VuZC5jZWxsX2lkID0gYnV0dG9uLmJvYXJkX2luZGV4O1xyXG4gICAgdG9TZW5kLm9ic3RhY2xlX251bWJlciA9IG9ic3RhY2xlX251bWJlciArIDE7XHJcbiAgICB0b1NlbmQub2JzdGFjbGVfbmFtZSA9IG9ic3RhY2xlX2xpc3Rbb2JzdGFjbGVfbnVtYmVyXTtcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuXHJcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGFyYWN0ZXItaW5mby1jb250YWluZXJcIik7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICB9XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3QpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b24pO1xyXG4gIHRpbnlfYW5pbWF0aW9uKGNvbnRhaW5lcik7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRfY2hhcmFjdGVyKGJvYXJkX2luZGV4KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcclxuICBzZWxlY3QuaWQgPSBcImNoYXJhY3Rlcl9jaG9zZW5cIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFyYWN0ZXJfbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IGNoYXJhY3Rlcl9saXN0W2ldO1xyXG4gICAgY3VycmVudF9vcHRpb24udmFsdWUgPSBpO1xyXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKGN1cnJlbnRfb3B0aW9uKTtcclxuICB9XHJcblxyXG4gIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGJ1dHRvbi5pbm5lckhUTUwgPSBcItCU0L7QsdCw0LLQuNGC0YxcIjtcclxuICBidXR0b24uYm9hcmRfaW5kZXggPSBib2FyZF9pbmRleDtcclxuICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgYnV0dG9uID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlcl9jaG9zZW5cIikudmFsdWUpO1xyXG5cclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ2FkZF9jaGFyYWN0ZXInO1xyXG4gICAgdG9TZW5kLmNlbGxfaWQgPSBidXR0b24uYm9hcmRfaW5kZXg7XHJcbiAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXIgKyAxO1xyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyX2xpc3RbY2hhcmFjdGVyX251bWJlcl07XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcblxyXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuICB0aW55X2FuaW1hdGlvbihjb250YWluZXIpO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbW92ZV9jaGFyYWN0ZXIodG9faW5kZXgsIHRvX2NlbGwpIHtcclxuICBmaWVsZF9jaG9zZW4gPSAwO1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdtb3ZlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLmZyb21faW5kZXggPSBjaG9zZW5faW5kZXg7XHJcbiAgdG9TZW5kLnRvX2luZGV4ID0gdG9faW5kZXg7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9udW1iZXIgPSBjaG9zZW5fY2hhcmFjdGVyX2luZGV4O1xyXG4gIHRvU2VuZC5jaGFyYWN0ZXJfYXZhdGFyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hvc2VuX2NoYXJhY3Rlcl9pbmRleF0uYXZhdGFyO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlGb2coKSB7XHJcblx0dmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHR2YXIgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gIGluZm8uaW5uZXJIVE1MID0gJ9Cc0Ysg0L3QtSDQt9C90LDQtdC8LCDRh9GC0L4g0Y3RgtC+INGC0LDQutC+0LUuINCV0YHQu9C4INCx0Ysg0LzRiyDQt9C90LDQu9C4INGH0YLQviDRjdGC0L4g0YLQsNC60L7QtSwg0L3QviDQvNGLINC90LUg0LfQvdCw0LXQvC4nO1xyXG5cclxuXHR2YXIgZm9nX3BpY3R1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiSU1HXCIpO1xyXG4gIGZvZ19waWN0dXJlLnNyYyA9IFFVRVNUSU9OX0lNQUdFO1xyXG4gIGZvZ19waWN0dXJlLnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBmb2dfcGljdHVyZS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mbyk7XHJcblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGZvZ19waWN0dXJlKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0X2NoYXJhY3RlcihpbmRleCwgY2VsbCkge1xyXG4gIHZhciBjaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGxldCBuYW1lID0gY2hhcmFjdGVyLm5hbWU7XHJcbiAgbGV0IGF2YXRhciA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcblxyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIHdlYXBvbl9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbi1pbmZvLWNvbnRhaW5lclwiKTtcclxuICB3ZWFwb25fY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIHZhciBuYW1lX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IG5hbWU7XHJcblxyXG4gIHZhciBhdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJJTUdcIik7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3JjID0gYXZhdGFyO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLndpZHRoID0gJzI1MHB4JztcclxuICBhdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobmFtZV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYXZhdGFyX2Rpc3BsYXkpO1xyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIgfHwgY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMSkge1xyXG5cclxuICB2YXIgc3RyZW5ndGhfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBzdHJlbmd0aF9kaXNwbGF5LmlubmVySFRNTCA9IFwiQ9C40LvQsDogXCIgKyBjaGFyYWN0ZXIuc3RyZW5ndGg7XHJcblxyXG4gIHZhciBzdGFtaW5hX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgc3RhbWluYV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0KLQtdC70L7RgdC70L7QttC10L3QuNC1OiBcIiArIGNoYXJhY3Rlci5zdGFtaW5hO1xyXG5cclxuICB2YXIgYWdpbGl0eV9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gIGFnaWxpdHlfZGlzcGxheS5pbm5lckhUTUwgPSBcItCb0L7QstC60L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gIHZhciBpbnRlbGxpZ2VuY2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBpbnRlbGxpZ2VuY2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCY0L3RgtC10LvQu9C10LrRgjogXCIgKyBjaGFyYWN0ZXIuaW50ZWxsaWdlbmNlO1xyXG5cclxuICB2YXIgS0RfdmFsdWUgPSBwYXJzZUludChjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtjaGFyYWN0ZXJfbnVtYmVyXSlcclxuICB2YXIgS0RfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBLRF9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JrQlDogXCIgKyBLRF92YWx1ZTtcclxuXHJcbiAgdmFyIGhwX3BlcmNlbnQgPSBwYXJzZUZsb2F0KGNoYXJhY3Rlcl9zdGF0ZS5IUFtjaGFyYWN0ZXJfbnVtYmVyXSkvcGFyc2VGbG9hdChIUF92YWx1ZXNbY2hhcmFjdGVyLnN0YW1pbmFdKVxyXG4gIGhwX3BlcmNlbnQgPSBNYXRoLmZsb29yKGhwX3BlcmNlbnQqMTAwKVxyXG5cclxuICB2YXIgSFBfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBIUF9kaXNwbGF5LmlkID0gXCJIUF9kaXNwbGF5XCI7XHJcbiAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgY2hhcmFjdGVyX3N0YXRlLkhQW2NoYXJhY3Rlcl9udW1iZXJdICsgXCIgKFwiICsgaHBfcGVyY2VudCArIFwiJSlcIjtcclxuXHJcbiAgdmFyIHRpcmVkX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgdGlyZWRfZGlzcGxheS5pZCA9IFwidGlyZWRfZGlzcGxheVwiO1xyXG4gIHRpcmVkX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQktGL0L3QvtGB0LvQuNCy0L7RgdGC0Yw6IFwiICsgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIHZhciBpbml0aWF0aXZlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgaW5pdGlhdGl2ZV9kaXNwbGF5LmlubmVySFRNTCA9IFwi0JjQvdC40YbQuNCw0YLQuNCy0LA6IFwiICsgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbY2hhcmFjdGVyX251bWJlcl07XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdHJlbmd0aF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3RhbWluYV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWdpbGl0eV9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW50ZWxsaWdlbmNlX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChLRF9kaXNwbGF5KTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoSFBfZGlzcGxheSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpcmVkX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbml0aWF0aXZlX2Rpc3BsYXkpO1xyXG5cclxuICB2YXIgbW92ZV9idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIG1vdmVfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/QtdGA0LXQvNC10YnQtdC90LjQtVwiO1xyXG4gIG1vdmVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgbW92ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgbW92ZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICB2YXIgY2hhcmFjdGVyX3BpY2tlZCA9IGV2ZW50LnRhcmdldFxyXG4gICAgdmFyIGNoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2NoYXJhY3Rlcl9waWNrZWQuaW5kZXhdO1xyXG4gICAgdmFyIG1vdmVfYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobW92ZV9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHZhciB3ZWFwb25fY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb24taW5mby1jb250YWluZXJcIik7XHJcbiAgICAgIHdlYXBvbl9jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgY2hvb3NlX2NoYXJhY3Rlcl90b19tb3ZlKGNoYXJhY3Rlcl9waWNrZWQuaW5kZXgsIGNoYXJhY3Rlcl9waWNrZWQuY2VsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCS0Ysg0L/QvtGC0YDQsNGC0LjQu9C4INCy0YHQtSDQv9C10YDQtdC80LXRidC10L3QuNGPINC90LAg0Y3RgtC+0Lwg0YXQvtC00YMhXCIpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuXHJcbiAgICB2YXIgZGVsZXRlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICAgIGRlbGV0ZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRlbGV0ZV9idXR0b24uY2VsbCA9IGNlbGw7XHJcbiAgICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBkZWxldGVfb2JqZWN0KGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjQt9C80LXQvdC40YLRjCDQstC40LTQuNC80L7RgdGC0YxcIjtcclxuICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eShjaGFyYWN0ZXJfbnVtYmVyKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGFtYWdlX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBkYW1hZ2VfYnV0dG9uLmlubmVySFRNTCA9IFwi0J3QsNC90LXRgdGC0Lgg0YPRgNC+0L1cIjtcclxuICAgIGRhbWFnZV9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICAgIGRhbWFnZV9idXR0b24ub25jbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgICAgaWYgKCEoZGFtYWdlX2ZpZWxkLnZhbHVlID09PSBcIlwiKSkge1xyXG4gICAgICAgIHZhciBkYW1hZ2UgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgICAgIHZhciBIUF9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJIUF9kaXNwbGF5XCIpO1xyXG4gICAgICAgIHZhciBuZXdfSFAgPSBjaGFyYWN0ZXJfc3RhdGUuSFBbY2hhcmFjdGVyX251bWJlcl0gLSBkYW1hZ2U7XHJcbiAgICAgICAgSFBfZGlzcGxheS5pbm5lckhUTUwgPSBcItCl0J86IFwiICsgbmV3X0hQO1xyXG5cclxuICAgICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnZGVhbF9kYW1hZ2UnO1xyXG4gICAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlcjtcclxuICAgICAgICB0b1NlbmQuZGFtYWdlID0gZGFtYWdlO1xyXG4gICAgICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gICAgdmFyIGRhbWFnZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIGRhbWFnZV9maWVsZC5pZCA9IFwiZGFtYWdlX2ZpZWxkXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQudHlwZSA9IFwibnVtYmVyXCI7XHJcbiAgICBkYW1hZ2VfZmllbGQucGxhY2Vob2xkZXIgPSBcItCX0L3QsNGH0LXQvdC40LUg0YPRgNC+0L3QsFwiO1xyXG5cclxuICB9XHJcblxyXG4gIHZhciBzZWFyY2hfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBzZWFyY2hfYnV0dG9uLmlubmVySFRNTCA9IFwi0J7QsdGL0YHQutCw0YLRjFwiO1xyXG4gIHNlYXJjaF9idXR0b24uaW5kZXggPSBpbmRleDtcclxuICBzZWFyY2hfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgc2VhcmNoX2FjdGlvbihldmVudC50YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNpbXBsZV9yb2xsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2ltcGxlX3JvbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0J/RgNC+0YHRgtC+IGQyMFwiO1xyXG4gIHNpbXBsZV9yb2xsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciByb2xsID0gcm9sbF94KDIwKVxyXG4gICAgdmFyIHRvU2VuZCA9IHt9XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9IFwic2ltcGxlX3JvbGxcIlxyXG4gICAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gY2hhcmFjdGVyLm5hbWVcclxuICAgIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb21cclxuICAgIHRvU2VuZC5yb2xsID0gcm9sbFxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfVxyXG5cclxuICB2YXIgd2VhcG9uX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgd2VhcG9uX3NlbGVjdC5pZCA9IFwid2VhcG9uX2Nob3NlblwiO1xyXG5cclxuICB2YXIgaW52ZW50b3J5ID0gY2hhcmFjdGVyLmludmVudG9yeVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGludmVudG9yeS5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGN1cnJlbnRfb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLmlubmVySFRNTCA9IHdlYXBvbl9saXN0W2ludmVudG9yeVtpXV07XHJcbiAgICBjdXJyZW50X29wdGlvbi52YWx1ZSA9IGludmVudG9yeVtpXTtcclxuICAgIHdlYXBvbl9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHBpY2tfd2VhcG9uX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLmlubmVySFRNTCA9IFwi0KHQvNC10L3QuNGC0Ywg0L7RgNGD0LbQuNC1XCI7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgcGlja193ZWFwb25fYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIHdlYXBvbl9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXBvbl9jaG9zZW5cIilcclxuICAgIHZhciB3ZWFwb25faW5kZXggPSB3ZWFwb25fc2VsZWN0LnZhbHVlXHJcbiAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bY2hhcmFjdGVyX251bWJlcl0gPSB3ZWFwb25faW5kZXhcclxuICAgIHZhciB3ZWFwb24gPSB3ZWFwb25fZGV0YWlsZWRfaW5mb1t3ZWFwb25faW5kZXhdXHJcblxyXG4gICAgdmFyIHdlYXBvbl9yYW5nZV9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fcmFuZ2VfZGlzcGxheVwiKVxyXG4gICAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQlNCw0LvRjNC90L7RgdGC0Yw6IFwiICsgd2VhcG9uLnJhbmdlXHJcblxyXG4gICAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX2RhbWFnZV9kaXNwbGF5XCIpXHJcbiAgICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQo9GA0L7QvTogXCIgKyB3ZWFwb24uZGFtYWdlWzBdICsgJ2QnICsgd2VhcG9uLmRhbWFnZVsxXVxyXG5cclxuICAgIHZhciB3ZWFwb25fbmFtZV9kaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCIpXHJcbiAgICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlubmVySFRNTCA9IHdlYXBvbi5uYW1lXHJcblxyXG4gICAgdmFyIHdlYXBvbl9hdmF0YXJfZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhcG9uX2F2YXRhcl9kaXNwbGF5XCIpXHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3JjID0gd2VhcG9uLmF2YXRhcjtcclxuICAgIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS53aWR0aCA9ICcyNTBweCc7XHJcbiAgICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzI1MHB4JztcclxuICB9XHJcblxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbl9pbmRleCA9IGNoYXJhY3Rlcl9zdGF0ZS5jdXJyZW50X3dlYXBvbltjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciBkZWZhdWx0X3dlYXBvbiA9IHdlYXBvbl9kZXRhaWxlZF9pbmZvW2RlZmF1bHRfd2VhcG9uX2luZGV4XVxyXG5cclxuICB2YXIgd2VhcG9uX3JhbmdlX2Rpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9yYW5nZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX3JhbmdlX2Rpc3BsYXkuaW5uZXJIVE1MID0gXCLQlNCw0LvRjNC90L7RgdGC0Yw6IFwiICsgZGVmYXVsdF93ZWFwb24ucmFuZ2VcclxuXHJcbiAgdmFyIHdlYXBvbl9kYW1hZ2VfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fZGFtYWdlX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9kYW1hZ2VfZGlzcGxheVwiO1xyXG4gIHdlYXBvbl9kYW1hZ2VfZGlzcGxheS5pbm5lckhUTUwgPSBcItCj0YDQvtC9OiBcIiArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVswXSArICdkJyArIGRlZmF1bHRfd2VhcG9uLmRhbWFnZVsxXVxyXG5cclxuICB2YXIgd2VhcG9uX2F2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuaWQgPSBcIndlYXBvbl9hdmF0YXJfZGlzcGxheVwiXHJcbiAgd2VhcG9uX2F2YXRhcl9kaXNwbGF5LnNyYyA9IGRlZmF1bHRfd2VhcG9uLmF2YXRhcjtcclxuICB3ZWFwb25fYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIHdlYXBvbl9hdmF0YXJfZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xyXG5cclxuICB2YXIgd2VhcG9uX25hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICB3ZWFwb25fbmFtZV9kaXNwbGF5LmlkID0gXCJ3ZWFwb25fbmFtZV9kaXNwbGF5XCI7XHJcbiAgd2VhcG9uX25hbWVfZGlzcGxheS5pbm5lckhUTUwgPSBkZWZhdWx0X3dlYXBvbi5uYW1lXHJcblxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9uYW1lX2Rpc3BsYXkpXHJcbiAgd2VhcG9uX2NvbnRhaW5lci5hcHBlbmQod2VhcG9uX2F2YXRhcl9kaXNwbGF5KVxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9yYW5nZV9kaXNwbGF5KVxyXG4gIHdlYXBvbl9jb250YWluZXIuYXBwZW5kKHdlYXBvbl9kYW1hZ2VfZGlzcGxheSlcclxuXHJcbiAgdmFyIGF0dGFja19idXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gIGF0dGFja19idXR0b24uaW5uZXJIVE1MID0gXCLQkNGC0LDQutC+0LLQsNGC0YxcIjtcclxuICBhdHRhY2tfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgdmFyIG1haW5fYWN0aW9uc19sZWZ0ID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICBpZiAobWFpbl9hY3Rpb25zX2xlZnQgPiAwKSB7XHJcbiAgICAgIGF0dGFjay5pbl9wcm9jZXNzID0gMVxyXG4gICAgICBhdHRhY2sud2VhcG9uX2lkID0gY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgIGF0dGFjay5hdHRhY2tlcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgYXR0YWNrLmF0dGFja2VyX3Bvc2l0aW9uID0gaW5kZXhcclxuICAgICAgZmllbGRfY2hvc2VuID0gMFxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5pbl9wcm9jZXNzID0gMFxyXG5cclxuICAgICAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL2F0dGFja19wbGFjZWhvbGRlci5qcGdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0KMg0LLQsNGBINC90LUg0L7RgdGC0LDQu9C+0YHRjCDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XHJcbiAgc2tpbGxfc2VsZWN0LmlkID0gXCJza2lsbF9jaG9zZW5cIjtcclxuXHJcbiAgdmFyIHNraWxsc2V0ID0gY2hhcmFjdGVyLnNraWxsc2V0XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2tpbGxzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBjdXJyZW50X29wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICBjdXJyZW50X29wdGlvbi5pbm5lckhUTUwgPSBza2lsbF9saXN0W3NraWxsc2V0W2ldXTtcclxuICAgIGN1cnJlbnRfb3B0aW9uLnZhbHVlID0gc2tpbGxzZXRbaV07XHJcbiAgICBza2lsbF9zZWxlY3QuYXBwZW5kQ2hpbGQoY3VycmVudF9vcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIHNraWxsX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgc2tpbGxfYnV0dG9uLmlubmVySFRNTCA9IFwi0JjRgdC/0L7Qu9GM0LfQvtCy0LDRgtGMINGD0LzQtdC90LjQtVwiO1xyXG4gIHNraWxsX2J1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIHZhciBza2lsbF9zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNraWxsX2Nob3NlblwiKVxyXG4gICAgdmFyIHNraWxsX2luZGV4ID0gc2tpbGxfc2VsZWN0LnZhbHVlXHJcbiAgICB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIGluZGV4LCBjZWxsKVxyXG4gIH1cclxuXHJcblxyXG4gIHZhciBidXR0b25fbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICBidXR0b25fbGlzdC5jbGFzc05hbWUgPSBcImJ1dHRvbl9saXN0XCI7XHJcbiAgdmFyIGxpbmUxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lNSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgdmFyIGxpbmU3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gIHZhciBsaW5lOCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICB2YXIgbGluZTkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblxyXG4gIGxpbmUxLmFwcGVuZENoaWxkKG1vdmVfYnV0dG9uKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGxpbmUyLmFwcGVuZENoaWxkKGRlbGV0ZV9idXR0b24pO1xyXG4gICAgbGluZTMuYXBwZW5kQ2hpbGQoZGFtYWdlX2J1dHRvbik7XHJcbiAgICBsaW5lMy5hcHBlbmRDaGlsZChkYW1hZ2VfZmllbGQpO1xyXG4gICAgbGluZTguYXBwZW5kQ2hpbGQoY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X2J1dHRvbik7XHJcbiAgfVxyXG4gIGxpbmU0LmFwcGVuZENoaWxkKHNlYXJjaF9idXR0b24pO1xyXG4gIGxpbmU1LmFwcGVuZENoaWxkKHBpY2tfd2VhcG9uX2J1dHRvbik7XHJcbiAgbGluZTUuYXBwZW5kQ2hpbGQod2VhcG9uX3NlbGVjdCk7XHJcbiAgbGluZTYuYXBwZW5kQ2hpbGQoYXR0YWNrX2J1dHRvbik7XHJcbiAgbGluZTcuYXBwZW5kQ2hpbGQoc2ltcGxlX3JvbGxfYnV0dG9uKTtcclxuICBsaW5lOS5hcHBlbmRDaGlsZChza2lsbF9idXR0b24pO1xyXG4gIGxpbmU5LmFwcGVuZENoaWxkKHNraWxsX3NlbGVjdCk7XHJcblxyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUxKTtcclxuICBpZiAobXlfcm9sZSA9PSBcImdtXCIpIHtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUyKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmUzKTtcclxuICAgIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU4KTtcclxuICB9XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTQpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU1KTtcclxuICBidXR0b25fbGlzdC5hcHBlbmRDaGlsZChsaW5lNik7XHJcbiAgYnV0dG9uX2xpc3QuYXBwZW5kQ2hpbGQobGluZTkpO1xyXG4gIGJ1dHRvbl9saXN0LmFwcGVuZENoaWxkKGxpbmU3KTtcclxuXHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbl9saXN0KTtcclxuXHJcbn1cclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZV9jaGFyYWN0ZXJfdmlzaWJpbGl0eShjaGFyYWN0ZXJfbnVtYmVyKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gXCJjaGFuZ2VfY2hhcmFjdGVyX3Zpc2liaWxpdHlcIjtcclxuICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG5cclxuICBpZiAoY2hhcmFjdGVyX3N0YXRlLnZpc2liaWxpdHlbY2hhcmFjdGVyX251bWJlcl0gPT0gMCkge1xyXG4gICAgdG9TZW5kLm5ld192YWx1ZSA9IDFcclxuICB9IGVsc2Uge1xyXG4gICAgdG9TZW5kLm5ld192YWx1ZSA9IDBcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlYXJjaF9hY3Rpb24oc2VhcmNoX2J1dHRvbikge1xyXG4gIHZhciBpbmRleCA9IHNlYXJjaF9idXR0b24uaW5kZXg7XHJcbiAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2dhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXTtcclxuXHJcbiAgdmFyIG5hbWUgPSBjaGFyYWN0ZXIubmFtZTtcclxuICB2YXIgbW9kaWZpY2F0b3IgPSBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtpbmRleF07XHJcbiAgdmFyIGludGVsbGlnZW5jZSA9IGNoYXJhY3Rlci5pbnRlbGxpZ2VuY2U7XHJcbiAgdmFyIHJvbGwgPSByb2xsU2VhcmNoKHBhcnNlSW50KGludGVsbGlnZW5jZSksIHBhcnNlSW50KG1vZGlmaWNhdG9yKSk7XHJcbiAgdmFyIHpvbmVfbnVtYmVyID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2luZGV4XTtcclxuICBwdXNoVG9MaXN0KCfQn9C10YDRgdC+0L3QsNC2ICcgKyBuYW1lICsgJyDQsdGA0L7RgdC40LsgJyArIHJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCcpO1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2VhcmNoX2FjdGlvbic7XHJcbiAgdG9TZW5kLmNoYXJhY3Rlcl9uYW1lID0gbmFtZTtcclxuICB0b1NlbmQucm9sbCA9IHJvbGw7XHJcbiAgdG9TZW5kLnpvbmVfbnVtYmVyID0gem9uZV9udW1iZXI7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbFNlYXJjaChpbnRlbGxpZ2VuY2UsIG1vZCkge1xyXG4gIHJldHVybiBpbnRlbGxpZ2VuY2UgKyByb2xsX3goMjApICsgbW9kO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWxldGVfb2JqZWN0KGV2ZW50KSB7XHJcbiAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhcmFjdGVyLWluZm8tY29udGFpbmVyXCIpO1xyXG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnZGVsZXRlX2NoYXJhY3Rlcic7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaW5kZXggPSBldmVudC50YXJnZXQuaW5kZXg7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdF9vYnN0YWNsZShpbmRleCwgY2VsbCkge1xyXG4gIHZhciBvYnN0YWNsZV9pZCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdICogKC0xKTtcclxuICB2YXIgb2JzdGFjbGUgPSBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvW29ic3RhY2xlX2lkXTtcclxuXHJcbiAgLy8ga2VlcCB0cmFjayBvZiBsYXN0IGNob3NlbiBvYnN0YWxlIHRvIHF1aWNrbHkgYWRkIHRvIHRoZSBtYXBcclxuICBsYXN0X29ic3RhY2xlID0gb2JzdGFjbGVfaWRcclxuXHJcbiAgbGV0IG5hbWUgPSBvYnN0YWNsZS5uYW1lO1xyXG4gIGxldCBhdmF0YXIgPSBvYnN0YWNsZS5hdmF0YXI7XHJcblxyXG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXJhY3Rlci1pbmZvLWNvbnRhaW5lclwiKTtcclxuICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgdmFyIG5hbWVfZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICBuYW1lX2Rpc3BsYXkuaW5uZXJIVE1MID0gbmFtZTtcclxuXHJcbiAgdmFyIGF2YXRhcl9kaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIklNR1wiKTtcclxuICBhdmF0YXJfZGlzcGxheS5zcmMgPSBhdmF0YXI7XHJcbiAgYXZhdGFyX2Rpc3BsYXkuc3R5bGUud2lkdGggPSAnMjUwcHgnO1xyXG4gIGF2YXRhcl9kaXNwbGF5LnN0eWxlLmhlaWdodCA9ICcyNTBweCc7XHJcblxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChuYW1lX2Rpc3BsYXkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhdmF0YXJfZGlzcGxheSk7XHJcblxyXG4gIHZhciBkZWxldGVfYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICBkZWxldGVfYnV0dG9uLmlubmVySFRNTCA9IFwi0KPQvdC40YfRgtC+0LbQuNGC0YxcIjtcclxuICBkZWxldGVfYnV0dG9uLmluZGV4ID0gaW5kZXg7XHJcbiAgZGVsZXRlX2J1dHRvbi5jZWxsID0gY2VsbDtcclxuICBkZWxldGVfYnV0dG9uLm9uY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgZGVsZXRlX29iamVjdChldmVudCk7XHJcbiAgfVxyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVfYnV0dG9uKTtcclxuXHJcbiAgdGlueV9hbmltYXRpb24oY29udGFpbmVyKTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjaG9vc2VfY2hhcmFjdGVyX3RvX21vdmUoaW5kZXgsIGNlbGwpIHtcclxuICBmaWVsZF9jaG9zZW4gPSAxO1xyXG4gIGF0dGFjay5pbl9wcm9jZXNzID0gMFxyXG4gIHRhcmdldGVkX3NraWxsLmluX3Byb2Nlc3MgPSAwXHJcbiAgY2hvc2VuX2luZGV4ID0gaW5kZXg7XHJcbiAgY2hvc2VuX2NoYXJhY3Rlcl9pbmRleCA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdO1xyXG4gIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9sb2FkaW5nLndlYnBcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gdW5kb19zZWxlY3Rpb24oKSB7XHJcbiAgZmllbGRfY2hvc2VuID0gMDtcclxuICB2YXIgb2xkX2NlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNlbGxfXCIgKyBjaG9zZW5faW5kZXgpO1xyXG4gIG9sZF9jZWxsLnNyYyA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2Nob3Nlbl9jaGFyYWN0ZXJfaW5kZXhdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gc3RvcF9hdHRhY2soKSB7XHJcbiAgYXR0YWNrLmluX3Byb2Nlc3MgPSAwXHJcbiAgdmFyIG9sZF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgYXR0YWNrLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1thdHRhY2suYXR0YWNrZXJfaWRdLmF2YXRhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X29iamVjdF9waWN0dXJlKGluZGV4X2luX2JvYXJkX3N0YXRlKSB7XHJcbiAgdmFyIGltYWdlID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgdmFyIGluZGV4X2luX2Jhc2U7XHJcbiAgaWYgKGluZGV4X2luX2JvYXJkX3N0YXRlID4gMCkge1xyXG4gICAgaW5kZXhfaW5fYmFzZSA9IGluZGV4X2luX2JvYXJkX3N0YXRlO1xyXG4gICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2luZGV4X2luX2Jhc2VdO1xyXG4gICAgaW1hZ2UgPSBjaGFyYWN0ZXIuYXZhdGFyO1xyXG4gIH0gZWxzZSBpZiAoaW5kZXhfaW5fYm9hcmRfc3RhdGUgPCAwKSB7XHJcbiAgICBpbmRleF9pbl9iYXNlID0gaW5kZXhfaW5fYm9hcmRfc3RhdGUgKiAoLTEpO1xyXG4gICAgdmFyIG9ic3RhY2xlID0gb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tpbmRleF9pbl9iYXNlXTtcclxuICAgIGltYWdlID0gb2JzdGFjbGUuYXZhdGFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGltYWdlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzYXZlQm9hcmQoKSB7XHJcbiAgdmFyIHNhdmVfbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwX25hbWVcIikudmFsdWU7XHJcbiAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IHtcclxuICAgIHNpemU6IGdhbWVfc3RhdGUuc2l6ZSxcclxuICAgIGJvYXJkX3N0YXRlOiBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlLFxyXG4gICAgZm9nX3N0YXRlOiBnYW1lX3N0YXRlLmZvZ19zdGF0ZSxcclxuICAgIHpvbmVfc3RhdGU6IGdhbWVfc3RhdGUuem9uZV9zdGF0ZSxcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZTogZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGUsXHJcbiAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mbzogY2hhcmFjdGVyX2RldGFpbGVkX2luZm8sXHJcbiAgICBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvOiBvYnN0YWNsZV9kZXRhaWxlZF9pbmZvLFxyXG4gICAgY2hhcmFjdGVyX3N0YXRlOiBjaGFyYWN0ZXJfc3RhdGVcclxuICB9O1xyXG5cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2F2ZV9nYW1lJztcclxuICB0b1NlbmQuc2F2ZV9uYW1lID0gc2F2ZV9uYW1lO1xyXG4gIHRvU2VuZC5mdWxsX2dhbWVfc3RhdGUgPSBmdWxsX2dhbWVfc3RhdGU7XHJcbiAgdG9TZW5kLmZyb21fbmFtZSA9IG15X25hbWU7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUluaXRpYXRpdmUoYWdpbGl0eSkge1xyXG4gIHJldHVybiBhZ2lsaXR5KjIgKyByb2xsX3goMjApO1xyXG59XHJcblxyXG5mdW5jdGlvbiByb2xsSW5pdGlhdGl2ZSgpIHtcclxuICBmb3IgKGxldCBpID0gMTsgaSA8IGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLkhQW2ldID4gMCkgeyAvLyBzbyBjaGFyYWN0ZXIgaSBpcyBwcmVzZW50XHJcbiAgICAgIC8vIHJldHJpZXZlIHRoYXQgY2hhcmFjdGVyJ3MgYWdpbGl0eVxyXG4gICAgICB2YXIgY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9baV07XHJcbiAgICAgIHZhciBhZ2lsaXR5ID0gY2hhcmFjdGVyLmFnaWxpdHk7XHJcblxyXG4gICAgICAvLyByb2xsIGluaXRpYXRpdmUgYW5kIGFkZCBhZ2lsaXR5IG1vZGlmaWNhdG9yXHJcbiAgICAgIHZhciBpbml0aWF0aXZlID0gY29tcHV0ZUluaXRpYXRpdmUocGFyc2VJbnQoYWdpbGl0eSkpO1xyXG5cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbaV0gPSBpbml0aWF0aXZlO1xyXG4gICAgfVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAncm9sbF9pbml0aWF0aXZlJztcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5pbml0aWF0aXZlX3N0YXRlID0gY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmU7XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvZ01vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDEpIHtcclxuICAgIC8vIHR1cm4gb24gZm9nIGFkZGluZyBtb2RlXHJcbiAgICBnbV9jb250cm9sX21vZCA9IDE7XHJcbiAgICBmb2dfYnV0dG9uLnRleHQoJ9CS0YvQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IEZPR19JTUFHRTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyB0dXJuIG9mZiBmb2cgYWRkaW5nIG1vZGVcclxuICAgIGdtX2NvbnRyb2xfbW9kID0gMDtcclxuICAgIGZvZ19idXR0b24udGV4dCgn0JLQutC7INCi0YPQvNCw0L0g0JLQvtC50L3RiycpO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0aWYgKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2ldID09IDEpIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF9jZWxsLnNyYyA9IGdldF9vYmplY3RfcGljdHVyZShnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gem9uZU1vZGVDaGFuZ2UoKSB7XHJcbiAgaWYgKGdtX2NvbnRyb2xfbW9kICE9IDIpIHtcclxuICAgIC8vIHR1cm4gb24gem9uZSBhZGRpbmcgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAyO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLRi9C60Lsg0JfQvtC90LDQu9GM0L3Ri9C5INGA0LXQttC40LwnKTtcclxuICAgIHpvbmVfbnVtYmVyX3NlbGVjdC5zaG93KCk7XHJcbiAgICBmb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgdW5mb2dfem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgc2VhcmNoX21vZGlmaWNhdG9yLnNob3coKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVfc3RhdGUuc2l6ZSpnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG5cdFx0XHRpZiAoZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldID4gMCkge1xyXG5cdFx0XHRcdHZhciBjdXJyZW50X3pvbmVfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiem9uZV90ZXh0X1wiICsgaSk7XHJcblx0XHRcdFx0Y3VycmVudF96b25lX3RleHQuaW5uZXJIVE1MID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2ldICsgJygnICsgZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbaV0gKyAnKSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8gYmFjayB0byBub3JtYWwgbW9kZVxyXG4gICAgZ21fY29udHJvbF9tb2QgPSAwO1xyXG4gICAgem9uZV9idXR0b24udGV4dCgn0JLQutC7INCX0L7QvdCw0LvRjNC90YvQuSDRgNC10LbQuNC8Jyk7XHJcbiAgICB6b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG4gICAgZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHVuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuICAgIHNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUqZ2FtZV9zdGF0ZS5zaXplOyBpKyspIHtcclxuXHRcdFx0XHR2YXIgY3VycmVudF96b25lX3RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInpvbmVfdGV4dF9cIiArIGkpO1xyXG5cdFx0XHRcdGN1cnJlbnRfem9uZV90ZXh0LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9nQ3VycmVudFpvbmUoKSB7XHJcbiAgZm9nUGFyc2Vab25lKDEpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1bmZvZ0N1cnJlbnRab25lKCkge1xyXG4gIGZvZ1BhcnNlWm9uZSgwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9nUGFyc2Vab25lKG1vZCkge1xyXG4gIHZhciBjdXJyZW50X3pvbmUgPSB6b25lX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ3VwZGF0ZV9mb2cnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgaWYgKG1vZCA9PSAwKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAncmVtb3ZlJztcclxuICB9IGVsc2UgaWYgKG1vZCA9PSAxKSB7XHJcbiAgICB0b1NlbmQudXBkYXRlX3R5cGUgPSAnYWRkJztcclxuICB9XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lX3N0YXRlLnNpemUgKiBnYW1lX3N0YXRlLnNpemU7IGkrKykge1xyXG4gICAgaWYgKGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtpXSA9PSBjdXJyZW50X3pvbmUpIHtcclxuICAgICAgdG9TZW5kLmluZGV4ID0gaTtcclxuICAgICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwdXNoVG9MaXN0KG1lc3NhZ2UpIHtcclxuICBmb3IgKGxldCBpPTE7IGkgPCBDSEFUX0NBU0g7IGkrKykge1xyXG4gICAgdmFyIGVsZW1lbnRfdG9fY29weSA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgaSArICdcIl0nKTtcclxuICAgIHZhciBlbGVtZW50X3RvX3Bhc3RlID0gJCgnW2RhdGEtbmFtZT1cIm5vdGlmaWNhdGlvbnNfbGlzdF9lbGVtZW50XycgKyAoaS0xKSArICdcIl0nKTtcclxuXHJcbiAgICBlbGVtZW50X3RvX3Bhc3RlLnRleHQoZWxlbWVudF90b19jb3B5LnRleHQoKSk7XHJcbiAgfVxyXG4gIHZhciB0b3BfZWxlbWVudCA9ICQoJ1tkYXRhLW5hbWU9XCJub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudF8nICsgKENIQVRfQ0FTSC0xKSArICdcIl0nKTtcclxuICB0b3BfZWxlbWVudC50ZXh0KG1lc3NhZ2UpO1xyXG5cclxuICBjaGF0X2J1dHRvbi5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAncmVkJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoYW5nZUNoYXRWaXNpYmlsaXR5KCkge1xyXG4gIGNoYXRfYnV0dG9uLmNzcygnYmFja2dyb3VuZC1jb2xvcicsICd3aGl0ZScpO1xyXG4gIGlmIChub3RpZmljYXRpb25zX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID09ICdub25lJykge1xyXG4gICAgbm90aWZpY2F0aW9uc19jb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSBlbHNlIHtcclxuICAgIG5vdGlmaWNhdGlvbnNfY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydF9uZXdfcm91bmQoKSB7XHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ25ld19yb3VuZCc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybV9hdHRhY2soaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bYXR0YWNrLndlYXBvbl9pZF1cclxuXHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgYXR0YWNrLmF0dGFja2VyX3Bvc2l0aW9uLCB3ZWFwb24ucmFuZ2UpKSB7XHJcblxyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX0tEID0gcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLktEX3BvaW50c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pICsgcGFyc2VJbnQoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXSlcclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICB2YXIgYXR0YWNraW5nX2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2F0dGFjay5hdHRhY2tlcl9pZF1cclxuICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfeCgyMClcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdyZXNvbHZlX2F0dGFjayc7XHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLmF0dGFja2VyX2lkID0gYXR0YWNrLmF0dGFja2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgaWYgKHdlYXBvbi50eXBlID09IFwicmFuZ2VkXCIpIHtcclxuICAgICAgICB2YXIgY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgICAgIH0gZWxzZSBpZiAod2VhcG9uLnR5cGUgPT0gXCJtZWxlZVwiKSB7XHJcbiAgICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIHBhcnNlSW50KGF0dGFja2luZ19jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGF0dGFja19ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbYXR0YWNrLmF0dGFja2VyX2lkXVxyXG4gICAgICBjb25zb2xlLmxvZyhhdHRhY2tfYm9udXMpXHJcbiAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBhdHRhY2suYXR0YWNrZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImRhbWFnZV9hZnRlcl9ldmFzaW9uXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCBhdHRhY2suYXR0YWNrZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgICAgIHRvU2VuZC5kYW1hZ2Vfcm9sbCA9IGRhbWFnZV9yb2xsXHJcbiAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX3dpdGhvdXRfZXZhc2lvblwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJLRF9ibG9ja1wiXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7IC8vIGZ1bGwgY3JpdFxyXG4gICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbFxyXG4gICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIGF0dGFjay5hdHRhY2tlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvi4uLlwiKVxyXG4gIH1cclxuICBzdG9wX2F0dGFjaygpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgY2hhcmFjdGVyX251bWJlciwgYXR0YWNrX3JvbGwsIHRhcmdldF9udW1iZXIpIHtcclxuICB2YXIgZGFtYWdlID0gMFxyXG4gIHZhciBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAxNikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHJvbGxfeCh3ZWFwb24uZGFtYWdlWzFdKVxyXG4gICAgICB9XHJcbiAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICB9XHJcbiAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW3RhcmdldF9udW1iZXJdLmhhc093blByb3BlcnR5KFwid2Vha3Nwb3RcIikgJiYgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfbnVtYmVyXS53ZWFrc3BvdC5odW50ZXJfaWQgPT0gY2hhcmFjdGVyX251bWJlcikge1xyXG4gICAgICAgIHN3aXRjaCAoYXR0YWNrX3JvbGwpIHtcclxuICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjJcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDE5OlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSoyXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgc3RyZW5ndGhfZGFtYWdlX21hcFtwYXJzZUludChjaGFyYWN0ZXIuc3RyZW5ndGgpXVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgICAgZGFtYWdlID0gZGFtYWdlKjVcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgICAgaWYgKHdlYXBvbi50eXBlID09ICdtZWxlZScpIHtcclxuICAgICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGFtYWdlID0gZGFtYWdlICsgY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tjaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzd2l0Y2ggKGF0dGFja19yb2xsKSB7XHJcbiAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICBkYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOTpcclxuICAgICAgICAgIGRhbWFnZSA9IHdlYXBvbi5kYW1hZ2VbMV0gKiB3ZWFwb24uZGFtYWdlWzBdXHJcbiAgICAgICAgICBpZiAod2VhcG9uLnR5cGUgPT0gJ21lbGVlJykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBzdHJlbmd0aF9kYW1hZ2VfbWFwW3BhcnNlSW50KGNoYXJhY3Rlci5zdHJlbmd0aCldXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2NoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UqMlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDIwOlxyXG4gICAgICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSozXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdlYXBvbi5kYW1hZ2VbMF07IGkrKykge1xyXG4gICAgICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKGF0dGFja19yb2xsIDwgMTkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3ZWFwb24uZGFtYWdlWzBdOyBpKyspIHtcclxuICAgICAgICBkYW1hZ2UgPSBkYW1hZ2UgKyByb2xsX3god2VhcG9uLmRhbWFnZVsxXSlcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgIH1cclxuICAgIGlmICh3ZWFwb24udHlwZSA9PSAnbWVsZWUnKSB7XHJcbiAgICAgIGRhbWFnZSA9IGRhbWFnZSArIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyLnN0cmVuZ3RoKV1cclxuICAgIH1cclxuICAgIGRhbWFnZSA9IGRhbWFnZSArIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbY2hhcmFjdGVyX251bWJlcl1cclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPT0gMjApIHtcclxuICAgICAgZGFtYWdlID0gZGFtYWdlICogMlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhbWFnZVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc3RvcF9za2lsbCgpIHtcclxuICB0YXJnZXRlZF9za2lsbC5pbl9wcm9jZXNzID0gMFxyXG4gIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIHRhcmdldGVkX3NraWxsLmF0dGFja2VyX3Bvc2l0aW9uKTtcclxuICBvbGRfY2VsbC5zcmMgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZF0uYXZhdGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiB3ZWFrX3Nwb3QoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gIHZhciBhdHRhY2tpbmdfY2hhcmFjdGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5hdHRhY2tlcl9pZCA9IHRhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXHJcbiAgdG9TZW5kLnRhcmdldF9pZCA9IHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXHJcblxyXG4gIHZhciBpbnRfY2hlY2sgPSByb2xsX3goMjApICsgcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgaWYgKGludF9jaGVjayA+PSAxNSkge1xyXG4gICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgfVxyXG5cclxuICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaGVhbChpbmRleCwgY2VsbCkge1xyXG4gIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgdmFyIGhlYWxlcl9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZF1cclxuICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG5cclxuICB2YXIgdGFyZ2V0X2hwID0gY2hhcmFjdGVyX3N0YXRlLkhQW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gIHZhciB0YXJnZXRfZnVsbF9ocCA9IEhQX3ZhbHVlc1t0YXJnZXRfY2hhcmFjdGVyLnN0YW1pbmFdXHJcbiAgdmFyIHJhdGlvID0gcGFyc2VGbG9hdCh0YXJnZXRfaHApL3BhcnNlRmxvYXQodGFyZ2V0X2Z1bGxfaHApXHJcblxyXG4gIHZhciBoZWFsX3JvbGwgPSByb2xsX3goMjApICsgcGFyc2VJbnQoaGVhbGVyX2NoYXJhY3Rlci5pbnRlbGxpZ2VuY2UpXHJcbiAgaWYgKGhlYWxlcl9jaGFyYWN0ZXIuc3BlY2lhbF90eXBlID09IFwibWVkXCIpIHtcclxuICAgIGhlYWxfcm9sbCA9IGhlYWxfcm9sbCArIHBhcnNlSW50KGhlYWxlcl9jaGFyYWN0ZXIuaW50ZWxsaWdlbmNlKVxyXG4gIH1cclxuICB2YXIgdG9TZW5kID0ge307XHJcbiAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gIHRvU2VuZC5za2lsbF9pbmRleCA9IHRhcmdldGVkX3NraWxsLnNraWxsX2lkXHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuaGVhbGVyX2lkID0gdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRcclxuICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuICB0b1NlbmQuaGVhbF9yb2xsID0gaGVhbF9yb2xsXHJcblxyXG4gIHZhciB0aHJlc2hvbGQgPSAwXHJcbiAgdmFyIGNyaXRpY2FsX3RocmVzaG9sZCA9IDBcclxuXHJcbiAgaWYgKHJhdGlvID4gMC45KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxMFxyXG4gICAgaWYgKGhlYWxfcm9sbCA+IHRocmVzaG9sZCkge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjc1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAxNVxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSB0YXJnZXRfZnVsbF9ocFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuOTUpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC41KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyMFxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMjlcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC45NSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjgyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyYXRpbyA+IDAuMykge1xyXG4gICAgdGhyZXNob2xkID0gMjNcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDMyXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuODIpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmF0aW8gPiAwLjE1KSB7XHJcbiAgICB0aHJlc2hvbGQgPSAyNlxyXG4gICAgY3JpdGljYWxfdGhyZXNob2xkID0gMzVcclxuICAgIGlmIChoZWFsX3JvbGwgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgaWYgKGhlYWxfcm9sbCA+IGNyaXRpY2FsX3RocmVzaG9sZCAmJiBoZWFsZXJfY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcIm1lZFwiKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcImNyaXRpY2FsIHN1Y2Nlc3NcIlxyXG4gICAgICAgIHRvU2VuZC5uZXdfaHAgPSBNYXRoLmZsb29yKHRhcmdldF9mdWxsX2hwICogMC42MilcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjQpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJhdGlvID4gMC4wNSkge1xyXG4gICAgdGhyZXNob2xkID0gMzBcclxuICAgIGNyaXRpY2FsX3RocmVzaG9sZCA9IDQwXHJcbiAgICBpZiAoaGVhbF9yb2xsID4gdGhyZXNob2xkKSB7XHJcbiAgICAgIGlmIChoZWFsX3JvbGwgPiBjcml0aWNhbF90aHJlc2hvbGQgJiYgaGVhbGVyX2NoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gXCJtZWRcIikge1xyXG4gICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJjcml0aWNhbCBzdWNjZXNzXCJcclxuICAgICAgICB0b1NlbmQubmV3X2hwID0gTWF0aC5mbG9vcih0YXJnZXRfZnVsbF9ocCAqIDAuNClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic3VjY2Vzc1wiXHJcbiAgICAgICAgdG9TZW5kLm5ld19ocCA9IE1hdGguZmxvb3IodGFyZ2V0X2Z1bGxfaHAgKiAwLjIyKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZmFpbFwiXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRvU2VuZC5vdXRjb21lID0gXCJmYWlsXCJcclxuICB9XHJcblxyXG4gIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBiaWdfYnJvKGluZGV4LCBjZWxsKSB7XHJcbiAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuXHJcbiAgdmFyIHNoaWVsZF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZF0pXHJcbiAgdmFyIHRhcmdldF9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcblxyXG4gIHZhciBib251c19LRCA9IE1hdGgubWF4KHNoaWVsZF9LRCAtICB0YXJnZXRfS0QsIDApXHJcblxyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgdG9TZW5kLnNraWxsX2luZGV4ID0gdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWRcclxuICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gIHRvU2VuZC5zaGllbGRfaWQgPSB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZFxyXG4gIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gIHRvU2VuZC5ib251c19LRCA9IGJvbnVzX0tEXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIGluY3JlYXNlIGF0dGFjayByb2xsIGJ5IGFnaWxpdHkgYm9udXMgKDIqbW9kKVxyXG5mdW5jdGlvbiBjdXRfbGltYnMoaW5kZXgsIGNlbGwpIHtcclxuICB2YXIgd2VhcG9uID0gd2VhcG9uX2RldGFpbGVkX2luZm9bY2hhcmFjdGVyX3N0YXRlLmN1cnJlbnRfd2VhcG9uW3RhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXV1cclxuICB2YXIgY3V0X3JhbmdlID0gMVxyXG5cclxuICBpZiAoaXNJblJhbmdlKGluZGV4LCB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9wb3NpdGlvbiwgY3V0X3JhbmdlKSkge1xyXG5cclxuICAgIHZhciB0YXJnZXRfY2hhcmFjdGVyX251bWJlciA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbaW5kZXhdXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9LRCA9IHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5LRF9wb2ludHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdKSArIHBhcnNlSW50KGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFt0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0pXHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW3RhcmdldF9jaGFyYWN0ZXJfbnVtYmVyXVxyXG4gICAgdmFyIGF0dGFja2luZ19jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1t0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZF1cclxuICAgIHZhciBhdHRhY2tfcm9sbCA9IHJvbGxfeCgyMClcclxuXHJcbiAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSB0YXJnZXRlZF9za2lsbC5za2lsbF9pZFxyXG4gICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgIHRvU2VuZC5hdHRhY2tlcl9pZCA9IHRhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXHJcbiAgICB0b1NlbmQudGFyZ2V0X2lkID0gdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICBpZiAoYXR0YWNrX3JvbGwgPCAyMCkgey8vIG5vIGNyaXRcclxuICAgICAgdmFyIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBhdHRhY2tfcm9sbCArIDIqcGFyc2VJbnQoYXR0YWNraW5nX2NoYXJhY3Rlci5hZ2lsaXR5KVxyXG5cclxuICAgICAgdmFyIGF0dGFja19ib251cyA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdXHJcbiAgICAgIGN1bXVsYXRpdmVfYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsICsgYXR0YWNrX2JvbnVzXHJcblxyXG4gICAgICB0b1NlbmQuYXR0YWNrX3JvbGwgPSBjdW11bGF0aXZlX2F0dGFja19yb2xsXHJcblxyXG4gICAgICBpZiAoY3VtdWxhdGl2ZV9hdHRhY2tfcm9sbCA+IHRhcmdldF9jaGFyYWN0ZXJfS0QpIHsvLyDQldGB0YLRjCDQv9GA0L7QsdC40YLQuNC1XHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdID09IDEpIHtcclxuICAgICAgICAgIHZhciBldmFkZV9yb2xsID0gcm9sbF94KDIwKSArIHBhcnNlSW50KHRhcmdldF9jaGFyYWN0ZXIuYWdpbGl0eSlcclxuICAgICAgICAgIHRvU2VuZC5ldmFkZV9yb2xsID0gZXZhZGVfcm9sbFxyXG4gICAgICAgICAgaWYgKGV2YWRlX3JvbGwgPiBjdW11bGF0aXZlX2F0dGFja19yb2xsKSB7IC8vc3VjY2VzZnVsbHkgZXZhZGVkXHJcbiAgICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJldmFkZWRcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGRhbWFnZV9yb2xsID0gY29tcHV0ZV9kYW1hZ2Uod2VhcG9uLCB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZCwgYXR0YWNrX3JvbGwsIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyKVxyXG4gICAgICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdLnN0cmVuZ3RoKV0gLSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW3RhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXVxyXG4gICAgICAgICAgICB2YXIgZnVsbF9kYW1hZ2UgPSB3ZWFwb24uZGFtYWdlWzFdICogd2VhcG9uLmRhbWFnZVswXVxyXG4gICAgICAgICAgICBpZiAoZmxhdF9kYW1hZ2UgPiBmdWxsX2RhbWFnZS8zKSB7XHJcbiAgICAgICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRvU2VuZC5za2lsbF9vdXRjb21lID0gXCJmYWlsXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZGFtYWdlX2FmdGVyX2V2YXNpb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgZGFtYWdlX3JvbGwgPSBjb21wdXRlX2RhbWFnZSh3ZWFwb24sIHRhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkLCBhdHRhY2tfcm9sbCwgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIpXHJcbiAgICAgICAgICB2YXIgZmxhdF9kYW1hZ2UgPSBkYW1hZ2Vfcm9sbCAtIHN0cmVuZ3RoX2RhbWFnZV9tYXBbcGFyc2VJbnQoY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdLnN0cmVuZ3RoKV0gLSBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW3RhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXVxyXG4gICAgICAgICAgdmFyIGZ1bGxfZGFtYWdlID0gd2VhcG9uLmRhbWFnZVsxXSAqIHdlYXBvbi5kYW1hZ2VbMF1cclxuICAgICAgICAgIGlmIChmbGF0X2RhbWFnZSA+IGZ1bGxfZGFtYWdlLzMpIHtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcImZhaWxcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdG9TZW5kLmRhbWFnZV9yb2xsID0gZGFtYWdlX3JvbGxcclxuICAgICAgICAgIHRvU2VuZC5vdXRjb21lID0gXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCJcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcIktEX2Jsb2NrXCJcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHsgLy8gZnVsbCBjcml0XHJcbiAgICAgIHRvU2VuZC5hdHRhY2tfcm9sbCA9IGF0dGFja19yb2xsXHJcbiAgICAgIHZhciBkYW1hZ2Vfcm9sbCA9IGNvbXB1dGVfZGFtYWdlKHdlYXBvbiwgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWQsIGF0dGFja19yb2xsLCB0YXJnZXRfY2hhcmFjdGVyX251bWJlcilcclxuICAgICAgdG9TZW5kLnNraWxsX291dGNvbWUgPSBcInN1Y2Nlc3NcIlxyXG4gICAgICB0b1NlbmQuZGFtYWdlX3JvbGwgPSBkYW1hZ2Vfcm9sbFxyXG4gICAgICB0b1NlbmQub3V0Y29tZSA9IFwiZnVsbF9jcml0XCJcclxuICAgIH1cclxuICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoXCLQlNCw0LvQtdC60L7QstCw0YLQvi4uLlwiKVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldm91cihpbmRleCwgY2VsbCkge1xyXG4gIGlmIChpc0luUmFuZ2UoaW5kZXgsIHRhcmdldGVkX3NraWxsLmF0dGFja2VyX3Bvc2l0aW9uLCAxKSkge1xyXG4gICAgdmFyIHRhcmdldF9jaGFyYWN0ZXJfbnVtYmVyID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF1cclxuICAgIHZhciBzdGFja3MgPSAwXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRfY2hhcmFjdGVyX251bWJlcl0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgIHN0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXJdLk1hcmt1c19zdGFja3NcclxuICAgIH1cclxuICAgIHZhciBkYW1hZ2UgPSBzdGFja3MqNSArIHJvbGxfeCgxMClcclxuICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgIHRvU2VuZC5za2lsbF9pbmRleCA9IHRhcmdldGVkX3NraWxsLnNraWxsX2lkXHJcbiAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgdG9TZW5kLmF0dGFja2VyX2lkID0gdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRcclxuICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgdG9TZW5kLmRhbWFnZSA9IGRhbWFnZVxyXG4gICAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKSB7XHJcbiAgaWYgKGlzSW5SYW5nZShpbmRleCwgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfcG9zaXRpb24sIDEpKSB7XHJcbiAgICB2YXIgdGFyZ2V0X2NoYXJhY3Rlcl9udW1iZXIgPSBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW2luZGV4XVxyXG4gICAgdmFyIGhlYWxfYW1vdW50ID0gMFxyXG5cclxuICAgIHZhciBkYW1hZ2VfZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhbWFnZV9maWVsZFwiKTtcclxuICAgIGlmICghKGRhbWFnZV9maWVsZC52YWx1ZSA9PT0gXCJcIikpIHtcclxuICAgICAgaGVhbF9hbW91bnQgPSBwYXJzZUludChkYW1hZ2VfZmllbGQudmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiaW9wb29sID0gMFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWRdLmhhc093blByb3BlcnR5KFwiYmlvcG9vbFwiKSkge1xyXG4gICAgICBiaW9wb29sID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1t0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZF0uYmlvcG9vbFxyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFsX2Ftb3VudCA+IDAgJiYgYmlvcG9vbCA+PSBoZWFsX2Ftb3VudCkge1xyXG4gICAgICB2YXIgdG9TZW5kID0ge307XHJcbiAgICAgIHRvU2VuZC5jb21tYW5kID0gJ3NraWxsJztcclxuICAgICAgdG9TZW5kLnNraWxsX2luZGV4ID0gdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWRcclxuICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgdG9TZW5kLmhlYWxlcl9pZCA9IHRhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkXHJcbiAgICAgIHRvU2VuZC50YXJnZXRfaWQgPSB0YXJnZXRfY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0b1NlbmQuaGVhbF9hbW91bnQgPSBoZWFsX2Ftb3VudFxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtdCy0L7Qt9C80L7QttC90L7QtSDQt9C90LDRh9C10L3QuNC1INC70LXRh9C10L3QuNGPXCIpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIGFsZXJ0KFwi0JTQsNC70LXQutC+0LLQsNGC0L5cIilcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1fc2tpbGwoaW5kZXgsIGNlbGwpIHtcclxuICBzd2l0Y2godGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWQpIHtcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgICBjdXRfbGltYnMoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgICAgd2Vha19zcG90KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDQ6IC8vINCb0LXRh9C10L3QuNC1XHJcbiAgICAgIGhlYWwoaW5kZXgsIGNlbGwpXHJcbiAgICAgIHN0b3Bfc2tpbGwoKVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgNTogLy8g0JvQtdGH0LXQvdC40LVcclxuICAgICAgYmlnX2JybyhpbmRleCwgY2VsbClcclxuICAgICAgc3RvcF9za2lsbCgpXHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LVcclxuICAgICAgZGV2b3VyKGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDk6XHJcbiAgICAgIGFic29sdXRlX3JlY292ZXJ5KGluZGV4LCBjZWxsKVxyXG4gICAgICBzdG9wX3NraWxsKClcclxuICAgICAgYnJlYWs7XHJcblxyXG4gICAgZGVmYXVsdDpcclxuICAgICAgYWxlcnQoXCJVbmtub3duIHRhcmdldGVkIHNraWxsXCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1c2Vfc2tpbGwoc2tpbGxfaW5kZXgsIGNoYXJhY3Rlcl9udW1iZXIsIHBvc2l0aW9uLCBjZWxsKSB7XHJcbiAgc2tpbGxfaW5kZXggPSBwYXJzZUludChza2lsbF9pbmRleClcclxuICBzd2l0Y2goc2tpbGxfaW5kZXgpIHtcclxuICAgIGNhc2UgMDogLy/QoNGL0LLQvtC6XHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHNvY2tldC5zZW5kTWVzc2FnZSh0b1NlbmQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAxOiAvL9Cf0YDQuNC70LjQsiDQkNC00YDQtdC90LDQu9C40L3QsFxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVcIikpIHtcclxuICAgICAgICBhbGVydChcItCj0LzQtdC90LjQtSDQstGB0LUg0LXRidC1INC90LAg0LrRg9C70LTQsNGD0L3QtVwiKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgICB0b1NlbmQuY29tbWFuZCA9ICdza2lsbCc7XHJcbiAgICAgICAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICAgICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICAgIHRvU2VuZC5jaGFyYWN0ZXJfbnVtYmVyID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gcm9sbF94KDQpXHJcbiAgICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSByb2xsX3goNClcclxuICAgICAgICB0b1NlbmQuZXh0cmFfYWN0aW9ucyA9IGV4dHJhX2FjdGlvbnNcclxuICAgICAgICB0b1NlbmQubWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnNcclxuICAgICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgMjogLy8g0J/QvtC00YDQtdC30LDRgtGMINGB0YPRhdC+0LbQuNC70LjRj1xyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgZmllbGRfY2hvc2VuID0gMFxyXG4gICAgICBhdHRhY2suaW5fcHJvY2VzcyA9IDBcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuaW5fcHJvY2VzcyA9IDFcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgMzogLy8g0KHQu9Cw0LHQvtC1INC80LXRgdGC0L5cclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2NoYXJhY3Rlcl9udW1iZXJdID4gMCkge1xyXG4gICAgICBmaWVsZF9jaG9zZW4gPSAwXHJcbiAgICAgIGF0dGFjay5pbl9wcm9jZXNzID0gMFxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5pbl9wcm9jZXNzID0gMVxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5za2lsbF9pZCA9IHNraWxsX2luZGV4XHJcbiAgICAgIHRhcmdldGVkX3NraWxsLmF0dGFja2VyX2lkID0gY2hhcmFjdGVyX251bWJlclxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9wb3NpdGlvbiA9IHBvc2l0aW9uXHJcbiAgICAgIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA0OiAvLyDQm9C10YfQtdC90LjQtVxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIGZpZWxkX2Nob3NlbiA9IDBcclxuICAgICAgYXR0YWNrLmluX3Byb2Nlc3MgPSAwXHJcbiAgICAgIHRhcmdldGVkX3NraWxsLmluX3Byb2Nlc3MgPSAxXHJcbiAgICAgIHRhcmdldGVkX3NraWxsLnNraWxsX2lkID0gc2tpbGxfaW5kZXhcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgIHRhcmdldGVkX3NraWxsLmF0dGFja2VyX3Bvc2l0aW9uID0gcG9zaXRpb25cclxuICAgICAgY2VsbC5zcmMgPSBcIi4vaW1hZ2VzL0NoaWRvcmkud2VicFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYWxlcnQoXCLQndC1INGF0LLQsNGC0LDQtdGCINC00LXQudGB0YLQstC40LkhXCIpXHJcbiAgICB9XHJcbiAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDU6IC8vINCR0L7Qu9GM0YjQvtC5INCx0YDQsNGCXHJcbiAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgZmllbGRfY2hvc2VuID0gMFxyXG4gICAgICBhdHRhY2suaW5fcHJvY2VzcyA9IDBcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuaW5fcHJvY2VzcyA9IDFcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgNjogLy8g0J/QvtC00L3Rj9GC0Ywg0YnQuNGC0YtcclxuICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwKSB7XHJcbiAgICAgIHZhciB0b1NlbmQgPSB7fTtcclxuICAgICAgdG9TZW5kLmNvbW1hbmQgPSAnc2tpbGwnO1xyXG4gICAgICB0b1NlbmQucm9vbV9udW1iZXIgPSBteV9yb29tO1xyXG4gICAgICB0b1NlbmQuc2tpbGxfaW5kZXggPSBza2lsbF9pbmRleFxyXG4gICAgICB0b1NlbmQuY2hhcmFjdGVyX251bWJlciA9IGNoYXJhY3Rlcl9udW1iZXJcclxuXHJcbiAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2NoYXJhY3Rlcl9udW1iZXJdLmhhc093blByb3BlcnR5KFwic2hpZWxkX3VwXCIpKSB7XHJcbiAgICAgICAgdG9TZW5kLm91dGNvbWUgPSBcInNoaWVsZF9kb3duXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0b1NlbmQub3V0Y29tZSA9IFwic2hpZWxkX3VwXCJcclxuICAgICAgfVxyXG4gICAgICBzb2NrZXQuc2VuZE1lc3NhZ2UodG9TZW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KFwi0J3QtSDRhdCy0LDRgtCw0LXRgiDQtNC10LnRgdGC0LLQuNC5IVwiKVxyXG4gICAgfVxyXG4gICAgYnJlYWs7XHJcblxyXG4gICAgY2FzZSA3OiAvLyDQv9C+0LbQuNGA0LDQvdC40LUg0YHRg9GJ0L3QvtGB0YLQuFxyXG4gICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bY2hhcmFjdGVyX251bWJlcl0gPiAwICYmIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgZmllbGRfY2hvc2VuID0gMFxyXG4gICAgICBhdHRhY2suaW5fcHJvY2VzcyA9IDBcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuaW5fcHJvY2VzcyA9IDFcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuc2tpbGxfaWQgPSBza2lsbF9pbmRleFxyXG4gICAgICB0YXJnZXRlZF9za2lsbC5hdHRhY2tlcl9pZCA9IGNoYXJhY3Rlcl9udW1iZXJcclxuICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICBjZWxsLnNyYyA9IFwiLi9pbWFnZXMvQ2hpZG9yaS53ZWJwXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgIH1cclxuICAgIGJyZWFrO1xyXG5cclxuICAgIGNhc2UgODogLy8g0YPQt9C90LDRgtGMINCx0LjQvtC/0YPQu1xyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tjaGFyYWN0ZXJfbnVtYmVyXS5oYXNPd25Qcm9wZXJ0eShcImJpb3Bvb2xcIikpIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7OiBcIiArIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbY2hhcmFjdGVyX251bWJlcl0uYmlvcG9vbClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LDQutC+0L/Qu9C10L3QvdGL0Lkg0LHQuNC+0L/Rg9C7INC+0YLRgdGD0YLRgdGC0LLRg9C10YJcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBjYXNlIDk6IC8vINCx0LXQt9GD0L/RgNC10YfQvdC+0LUg0LLQvtGB0YHRgtCw0L3QvtCy0LvQtdC90LjQtVxyXG4gICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltjaGFyYWN0ZXJfbnVtYmVyXSA+IDApIHtcclxuICAgICAgICBmaWVsZF9jaG9zZW4gPSAwXHJcbiAgICAgICAgYXR0YWNrLmluX3Byb2Nlc3MgPSAwXHJcbiAgICAgICAgdGFyZ2V0ZWRfc2tpbGwuaW5fcHJvY2VzcyA9IDFcclxuICAgICAgICB0YXJnZXRlZF9za2lsbC5za2lsbF9pZCA9IHNraWxsX2luZGV4XHJcbiAgICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfaWQgPSBjaGFyYWN0ZXJfbnVtYmVyXHJcbiAgICAgICAgdGFyZ2V0ZWRfc2tpbGwuYXR0YWNrZXJfcG9zaXRpb24gPSBwb3NpdGlvblxyXG4gICAgICAgIGNlbGwuc3JjID0gXCIuL2ltYWdlcy9DaGlkb3JpLndlYnBcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhbGVydChcItCd0LUg0YXQstCw0YLQsNC10YIg0LTQtdC50YHRgtCy0LjQuSFcIilcclxuICAgICAgfVxyXG4gICAgICBicmVhaztcclxuXHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBhbGVydChcItCd0LUg0LfQvdCw0LXQvCDRjdGC0L4g0YPQvNC10L3QuNC1XCIpXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFuZ2VfYmF0dGxlX21vZCgpIHtcclxuICBpZiAoYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICB2YXIgbmV3X3ZhbHVlID0gMVxyXG4gIH1cclxuXHJcbiAgdmFyIHRvU2VuZCA9IHt9O1xyXG4gIHRvU2VuZC5jb21tYW5kID0gJ2JhdHRsZV9tb2QnO1xyXG4gIHRvU2VuZC5yb29tX251bWJlciA9IG15X3Jvb207XHJcbiAgdG9TZW5kLnZhbHVlID0gbmV3X3ZhbHVlXHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn1cclxuXHJcbi8vIHtib2FyZF9zdGF0ZTogW10sIEhQX3N0YXRlOiBbXSwgaW5pdGlhdGl2ZV9zdGF0ZTogW10sIGZvZ19zdGF0ZTogW10sIHpvbmVfc3RhdGU6IFtdLCBzaXplOiAwLCBzZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGU6IFtdfTtcclxuZnVuY3Rpb24gbWlycm9yX2JvYXJkKCkge1xyXG4gIHZhciBsZWZ0X2luZGV4O1xyXG4gIHZhciByaWdodF9pbmRleDtcclxuICB2YXIgdGVtcDtcclxuICB2YXIgbGVmdF9jZWxsO1xyXG4gIHZhciByaWdodF9jZWxsO1xyXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgZ2FtZV9zdGF0ZS5zaXplOyB5KyspIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgZ2FtZV9zdGF0ZS5zaXplLzI7IHgrKykge1xyXG5cclxuICAgICAgbGVmdF9pbmRleCA9IHkqZ2FtZV9zdGF0ZS5zaXplICsgeDtcclxuICAgICAgcmlnaHRfaW5kZXggPSB5KmdhbWVfc3RhdGUuc2l6ZSArIHBhcnNlSW50KGdhbWVfc3RhdGUuc2l6ZSkgLSB4IC0gMTtcclxuICAgICAgLy9jb25zb2xlLmxvZygneTogJyArIHkgKyAnIHg6ICcgKyB4ICsgJyBsZWZ0IGluZGV4OiAnICsgbGVmdF9pbmRleCArICcgcmlnaHQgaW5kZXg6ICcgKyByaWdodF9pbmRleCk7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtsZWZ0X2luZGV4XSA9IGdhbWVfc3RhdGUuYm9hcmRfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmJvYXJkX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuZm9nX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLmZvZ19zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgdGVtcCA9IGdhbWVfc3RhdGUuem9uZV9zdGF0ZVtsZWZ0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XTtcclxuICAgICAgZ2FtZV9zdGF0ZS56b25lX3N0YXRlW3JpZ2h0X2luZGV4XSA9IHRlbXA7XHJcblxyXG4gICAgICB0ZW1wID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbbGVmdF9pbmRleF07XHJcbiAgICAgIGdhbWVfc3RhdGUuc2VhcmNoX21vZGlmaWNhdG9yX3N0YXRlW2xlZnRfaW5kZXhdID0gZ2FtZV9zdGF0ZS5zZWFyY2hfbW9kaWZpY2F0b3Jfc3RhdGVbcmlnaHRfaW5kZXhdO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtyaWdodF9pbmRleF0gPSB0ZW1wO1xyXG5cclxuICAgICAgbGVmdF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGxlZnRfaW5kZXgpO1xyXG4gICAgICByaWdodF9jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHJpZ2h0X2luZGV4KTtcclxuXHJcbiAgICAgIHRlbXAgPSBsZWZ0X2NlbGwuc3JjO1xyXG4gICAgICBsZWZ0X2NlbGwuc3JjID0gcmlnaHRfY2VsbC5zcmM7XHJcbiAgICAgIHJpZ2h0X2NlbGwuc3JjID0gdGVtcDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vc29ja2V0LmluaXQoJ3dzOi8vbG9jYWxob3N0OjMwMDEnKTtcclxuc29ja2V0LmluaXQoU0VSVkVSX0FERFJFU1MpO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyT3BlbkhhbmRsZXIoKCkgPT4ge1xyXG4gIHZhciB0b1NlbmQgPSB7fTtcclxuICB0b1NlbmQuY29tbWFuZCA9ICdwbGF5ZXJfaW5mbyc7XHJcbiAgdG9TZW5kLnJvb21fbnVtYmVyID0gbXlfcm9vbTtcclxuICB0b1NlbmQuZnJvbV9uYW1lID0gbXlfbmFtZTtcclxuICB0b1NlbmQucm9sZSA9IG15X3JvbGU7XHJcbiAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgdG9TZW5kLnBhc3N3b3JkID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdnbV9wYXNzd29yZCcpKTtcclxuICB9XHJcbiAgc29ja2V0LnNlbmRNZXNzYWdlKHRvU2VuZCk7XHJcbn0pO1xyXG5cclxuc29ja2V0LnJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIoKGRhdGEpID0+IHtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBpZiAoKChkYXRhLnRvX25hbWUgPT0gbXlfbmFtZSkgfHwgKGRhdGEudG9fbmFtZSA9PSAnYWxsJykpICYmIChkYXRhLnJvb21fbnVtYmVyID09IG15X3Jvb20pKSB7XHJcbiAgICBpZiAoZGF0YS5jb21tYW5kID09ICdwbGF5ZXJfaW5mb19yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuaXNWYWxpZCA9PSAwKSB7XHJcbiAgICAgICAgYWxlcnQoJ9Ci0LAg0LrQsNC60L7QuSDRgtGLINCz0LwnKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXRhLnJvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIGNyZWF0ZV9ib2FyZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfYm9hcmRfYnV0dG9uLnNob3coKTtcclxuICAgICAgICBsb2FkX2JvYXJkX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgcm9sbF9pbml0aWF0aXZlX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgZm9nX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgem9uZV9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIHNhdmVfbmFtZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgYm9hcmRfc2l6ZV9pbnB1dC5zaG93KCk7XHJcbiAgICAgICAgbWlycm9yX2J1dHRvbi5zaG93KCk7XHJcbiAgICAgICAgbmV4dF9yb3VuZF9idXR0b24uc2hvdygpO1xyXG4gICAgICAgIGJhdHRsZV9tb2RfYnV0dG9uLnNob3coKTtcclxuICAgICAgfVxyXG4gICAgICBjaGFyYWN0ZXJfbGlzdCA9IGRhdGEuY2hhcmFjdGVyX2xpc3Q7XHJcbiAgICAgIG9ic3RhY2xlX2xpc3QgPSBkYXRhLm9ic3RhY2xlX2xpc3Q7XHJcbiAgICAgIHdlYXBvbl9saXN0ID0gZGF0YS53ZWFwb25fbGlzdFxyXG4gICAgICB3ZWFwb25fZGV0YWlsZWRfaW5mbyA9IGRhdGEud2VhcG9uX2RldGFpbGVkX2luZm9cclxuICAgICAgc2tpbGxfbGlzdCA9IGRhdGEuc2tpbGxfbGlzdFxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdjb25zdHJ1Y3RfYm9hcmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNvbnN0cnVjdF9ib2FyZChkYXRhLmdhbWVfc3RhdGUpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2FkZF9jaGFyYWN0ZXJfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBjaGFyYWN0ZXIgPSBkYXRhLmNoYXJhY3Rlcl9pbmZvO1xyXG4gICAgICBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyO1xyXG4gICAgICBpZiAoISgobXlfcm9sZSA9PSAncGxheWVyJykmJihnYW1lX3N0YXRlLmZvZ19zdGF0ZVtkYXRhLmNlbGxfaWRdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjZWxsX1wiICsgZGF0YS5jZWxsX2lkKTtcclxuICAgICAgICBjZWxsLnNyYyA9IGNoYXJhY3Rlci5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5jaGFyYWN0ZXJfbnVtYmVyO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IEhQX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBzdGFtaW5hX3ZhbHVlc1tjaGFyYWN0ZXIuc3RhbWluYV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbW92ZV9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gYm9udXNfYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gbWFpbl9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmluaXRpYXRpdmVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5hZ2lsaXR5O1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuS0RfcG9pbnRzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXIuS0RfcG9pbnRzO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDA7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IDE7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS52aXNpYmlsaXR5W2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwO1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuY3VycmVudF93ZWFwb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlci5pbnZlbnRvcnlbMF1cclxuICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gMFxyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSAwXHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IHt9XHJcblxyXG5cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdhZGRfb2JzdGFjbGVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBvYnN0YWNsZSA9IGRhdGEub2JzdGFjbGVfaW5mbztcclxuICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mb1tkYXRhLm9ic3RhY2xlX251bWJlcl0gPSBvYnN0YWNsZTtcclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbZGF0YS5jZWxsX2lkXSA9PSAxKSkpIHtcclxuICAgICAgICB2YXIgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGRhdGEuY2VsbF9pZCk7XHJcbiAgICAgICAgY2VsbC5zcmMgPSBvYnN0YWNsZS5hdmF0YXI7XHJcbiAgICAgIH1cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmNlbGxfaWRdID0gZGF0YS5vYnN0YWNsZV9udW1iZXIgKiAoLTEpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ21vdmVfY2hhcmFjdGVyX3Jlc3BvbnNlJykge1xyXG4gICAgICB2YXIgdG9faW5kZXggPSBkYXRhLnRvX2luZGV4O1xyXG4gICAgICB2YXIgZnJvbV9pbmRleCA9IGRhdGEuZnJvbV9pbmRleDtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVt0b19pbmRleF0gPSBkYXRhLmNoYXJhY3Rlcl9udW1iZXI7XHJcblxyXG4gICAgICBpZiAoYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSBzdGFtaW5hX21vdmVfY29zdFxyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICBpZiAoY2hhcmFjdGVyLnNwZWNpYWxfdHlwZSA9PSBcInNuaXBlclwiKSB7XHJcbiAgICAgICAgICB2YXIgZWZmZWN0c19vYmplY3QgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGlmIChlZmZlY3RzX29iamVjdC5oYXNPd25Qcm9wZXJ0eShcInNuaXBlcl9wYXNzaXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudF9kYW1hZ2VfYm9udXMgPSBlZmZlY3RzX29iamVjdC5zbmlwZXJfcGFzc2l2ZS5kYW1hZ2VfYm9udXNcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gY3VycmVudF9hdHRhY2tfYm9udXMgLSA1XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5kYW1hZ2VfYm9udXNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zbmlwZXJfcGFzc2l2ZS5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNuaXBlcl9wYXNzaXZlX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAtNVxyXG4gICAgICAgICAgICBzbmlwZXJfcGFzc2l2ZV9vYmplY3QuZGFtYWdlX2JvbnVzID0gMFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc25pcGVyX3Bhc3NpdmUgPSBzbmlwZXJfcGFzc2l2ZV9vYmplY3RcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gNVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCEoKG15X3JvbGUgPT0gJ3BsYXllcicpJiYoZ2FtZV9zdGF0ZS5mb2dfc3RhdGVbdG9faW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciB0b19jZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIHRvX2luZGV4KTtcclxuICAgICAgICB0b19jZWxsLnNyYyA9IGRhdGEuY2hhcmFjdGVyX2F2YXRhcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtmcm9tX2luZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2Zyb21faW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBvbGRfY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2VsbF9cIiArIGZyb21faW5kZXgpO1xyXG4gICAgICAgIG9sZF9jZWxsLnNyYyA9IEVNUFRZX0NFTExfUElDO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnZGVsZXRlX2NoYXJhY3Rlcl9yZXNwb25zZScpIHtcclxuICAgICAgZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtkYXRhLmluZGV4XSA9IDA7XHJcbiAgICAgIGlmICghKChteV9yb2xlID09ICdwbGF5ZXInKSYmKGdhbWVfc3RhdGUuZm9nX3N0YXRlW2RhdGEuaW5kZXhdID09IDEpKSkge1xyXG4gICAgICAgIHZhciBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NlbGxfJyArIGRhdGEuaW5kZXgpO1xyXG4gICAgICAgIGNlbGwuc3JjID0gRU1QVFlfQ0VMTF9QSUM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyb2xsX2luaXRpYXRpdmVfcmVzcG9uc2UnKSB7XHJcbiAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5pbml0aWF0aXZlID0gZGF0YS5pbml0aWF0aXZlX3N0YXRlO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2RlYWxfZGFtYWdlX3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gZGF0YS5kYW1hZ2U7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2F2ZV9nYW1lX3Jlc3BvbnNlJykge1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09IDEpIHtcclxuICAgICAgICBhbGVydCgnR2FtZSAnICsgZGF0YS5zYXZlX25hbWUgKyAnIHNhdmVkIHN1Y2Nlc2Z1bGx5Jyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ0dhbWUgd2l0aCBuYW1lICcgKyBkYXRhLnNhdmVfbmFtZSArICcgYWxyZWFkeSBleGlzdCEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2xvYWRfZ2FtZV9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PSAxKSB7XHJcbiAgICAgICAgdmFyIGZ1bGxfZ2FtZV9zdGF0ZSA9IGRhdGEuZnVsbF9nYW1lX3N0YXRlO1xyXG4gICAgICAgIGNoYXJhY3Rlcl9zdGF0ZSA9IGZ1bGxfZ2FtZV9zdGF0ZS5jaGFyYWN0ZXJfc3RhdGU7XHJcbiAgICAgICAgY2hhcmFjdGVyX2RldGFpbGVkX2luZm8gPSBmdWxsX2dhbWVfc3RhdGUuY2hhcmFjdGVyX2RldGFpbGVkX2luZm87XHJcbiAgICAgICAgb2JzdGFjbGVfZGV0YWlsZWRfaW5mbyA9IGZ1bGxfZ2FtZV9zdGF0ZS5vYnN0YWNsZV9kZXRhaWxlZF9pbmZvO1xyXG4gICAgICAgIGNvbnN0cnVjdF9ib2FyZChmdWxsX2dhbWVfc3RhdGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsZXJ0KCdGYWlsZWQgdG8gbG9hZCBnYW1lICcgKyBkYXRhLnNhdmVfbmFtZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICd1cGRhdGVfZm9nX3Jlc3BvbnNlJykge1xyXG5cdFx0XHRcdHZhciBpbmRleCA9IGRhdGEuaW5kZXg7XHJcblx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2VsbF8nICsgaW5kZXgpO1xyXG5cdFx0XHRcdGlmIChkYXRhLnVwZGF0ZV90eXBlID09ICdyZW1vdmUnKSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAwO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBnZXRfb2JqZWN0X3BpY3R1cmUoZ2FtZV9zdGF0ZS5ib2FyZF9zdGF0ZVtpbmRleF0pO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRnYW1lX3N0YXRlLmZvZ19zdGF0ZVtpbmRleF0gPSAxO1xyXG5cdFx0XHRcdFx0Y2VsbC5zcmMgPSBGT0dfSU1BR0U7XHJcblx0XHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChkYXRhLmNvbW1hbmQgPT0gJ2Fzc2lnbl96b25lX3Jlc3BvbnNlJykge1xyXG4gICAgICBnYW1lX3N0YXRlLnpvbmVfc3RhdGVbZGF0YS5pbmRleF0gPSBkYXRhLnpvbmVfbnVtYmVyO1xyXG4gICAgICBnYW1lX3N0YXRlLnNlYXJjaF9tb2RpZmljYXRvcl9zdGF0ZVtkYXRhLmluZGV4XSA9IGRhdGEubW9kaWZpY2F0b3I7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnY2hhbmdlX2NoYXJhY3Rlcl92aXNpYmlsaXR5X3Jlc3BvbnNlJykge1xyXG4gICAgICBjaGFyYWN0ZXJfc3RhdGUudmlzaWJpbGl0eVtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gZGF0YS5uZXdfdmFsdWU7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2ltcGxlX3JvbGxfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gZGF0YS5jaGFyYWN0ZXJfbmFtZSArIFwiINCx0YDQvtGB0LDQtdGCIFwiICsgZGF0YS5yb2xsXHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdza2lsbF9yZXNwb25zZScpIHtcclxuICAgICAgc3dpdGNoKGRhdGEuc2tpbGxfaW5kZXgpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gMVxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICsgMVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0YHQvtCy0LXRgNGI0LDQtdGCINGA0YvQstC+0LpcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICBjaGFyYWN0ZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmNoYXJhY3Rlcl9udW1iZXJdXHJcbiAgICAgICAgICAgIHZhciBleHRyYV9hY3Rpb25zID0gZGF0YS5leHRyYV9hY3Rpb25zXHJcbiAgICAgICAgICAgIHdoaWxlIChleHRyYV9hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgIGlmIChleHRyYV9hY3Rpb25zICUgMiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICsgMVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdICsgMVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBleHRyYV9hY3Rpb25zID0gZXh0cmFfYWN0aW9ucyAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYWRyZW5hbGluZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICBhZHJlbmFsaW5lX29iamVjdC5jb29sZG93biA9IDNcclxuICAgICAgICAgICAgYWRyZW5hbGluZV9vYmplY3QubWludXNfYWN0aW9ucyA9IGRhdGEubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uYWRyZW5hbGluZSA9IGFkcmVuYWxpbmVfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDQuNGB0L/QvtC70YzQt9GD0LXRgiDQv9GA0LjQu9C40LIg0LDQtNGA0LXQvdCw0LvQuNC90LAg0Lgg0L/QvtC70YPRh9Cw0LXRgiBcIiArIGRhdGEuZXh0cmFfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40LkuINCt0YLQviDQsdGD0LTQtdGCINGB0YLQvtC40YLRjCBcIiArIGRhdGEubWludXNfYWN0aW9ucyArIFwiINC00LXQudGB0YLQstC40Lkg0L3QsCDRgdC70LXQtNGD0Y7RidC40Lkg0YXQvtC0LlwiXHJcbiAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgIHZhciBhdHRhY2tlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuYXR0YWNrZXJfaWRdXHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgICAgaWYgKGJhdHRsZV9tb2QgPT0gMSkge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zdGFtaW5hW2RhdGEuYXR0YWNrZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gLSBzdGFtaW5hX2N1dF9saW1iX2Nvc3RcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5za2lsbF9vdXRjb21lID09IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBsaW1iX2N1dF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9jdXRfbGltYlxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubW92ZV9hY3Rpb25bZGF0YS50YXJnZXRfaWRdID0gLTEwXHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINGD0YHQv9C10YjQvdC+INC/0L7QtNGA0LXQt9Cw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQsdC10LfRg9GB0L/QtdGI0L3QviDQv9GL0YLQsNC10YLRgdGPINC/0L7QtNGA0LXQt9Cw0YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEuZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2tpbGxfb3V0Y29tZSA9PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICAgICAgbGltYl9jdXRfb2JqZWN0LmNvb2xkb3duID0gY29vbGRvd25fY3V0X2xpbWJcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uY3V0X2xpbWIgPSBsaW1iX2N1dF9vYmplY3RcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2RhdGEudGFyZ2V0X2lkXSA9IC0xMFxyXG4gICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCx0LXQt9GD0YHQv9C10YjQvdC+INC/0YvRgtCw0LXRgtGB0Y8g0L/QvtC00YDQtdC30LDRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQutC+0YLQvtGA0YvQuSDQvdC1INGB0LzQvtCzINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEuZGFtYWdlX3JvbGxcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5jYW5fZXZhZGVbZGF0YS50YXJnZXRfaWRdID0gMFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmdWxsX2NyaXRcIjpcclxuICAgICAgICAgICAgICB2YXIgbGltYl9jdXRfb2JqZWN0ID0ge31cclxuICAgICAgICAgICAgICBsaW1iX2N1dF9vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9jdXRfbGltYiArIDFcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5jdXRfbGltYiA9IGxpbWJfY3V0X29iamVjdFxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tb3ZlX2FjdGlvbltkYXRhLnRhcmdldF9pZF0gPSAtMTBcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQv9C+0LTRgNC10LfQsNC10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiLCDQvdC1INC+0YHRgtCw0LLQu9GP0Y8g0LLQvtC30LzQvtC20L3QvtGB0YLQuCDRg9Cy0LXRgNC90YPRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfd2Vha3Nwb3RfY29zdFxyXG4gICAgICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICAgICAgaWYgKGRhdGEub3V0Y29tZSA9IFwic3VjY2Vzc1wiKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWFrc3BvdF9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICB3ZWFrc3BvdF9vYmplY3QuaHVudGVyX2lkID0gZGF0YS5hdHRhY2tlcl9pZFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS53ZWFrc3BvdCA9IHdlYWtzcG90X29iamVjdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQvtCx0L3QsNGA0YPQttC40Lsg0YHQu9Cw0LHQvtC1INC80LXRgdGC0L4gXCIgKyB0YXJnZXQubmFtZVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QtSDRg9C00LDQu9C+0YHRjCDQvtCx0L3QsNGA0YPQttC40YLRjCDRgdC70LDQsdC+0LUg0LzQtdGB0YLQviBcIiArIHRhcmdldC5uYW1lXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgIHZhciBoZWFsZXIgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLmhlYWxlcl9pZF1cclxuICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLmhlYWxlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuaGVhbGVyX2lkXSAtIDFcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmhlYWxlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmhlYWxlcl9pZF0gLSAxXHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGEub3V0Y29tZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiZmFpbFwiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L3QtSDQv9C+0LvRg9GH0LjQu9C+0YHRjCDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic3VjY2Vzc1wiOlxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQoyBcIiArIGhlYWxlci5uYW1lICsgXCIg0L/QvtC70YPRh9C40LvQvtGB0Ywg0YPRgdC/0LXRiNC90L4g0LLRi9C70LXRh9C40YLRjCBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5oZWFsX3JvbGwgKyBcIilcIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gZGF0YS5uZXdfaHBcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNyaXRpY2FsIHN1Y2Nlc3NcIjpcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KMgXCIgKyBoZWFsZXIubmFtZSArIFwiINC/0L7Qu9GD0YfQuNC70L7RgdGMINC60YDQuNGC0LjRh9C10YHQutC4ICgyINGB0YLQtdC/0LXQvdC4KSDQstGL0LvQtdGH0LjRgtGMIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmhlYWxfcm9sbCArIFwiKVwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBkYXRhLm5ld19ocFxyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC/0YDQuCDRgNCw0LfQsdC+0YDQtSDQvtGC0YXQuNC70LBcIilcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5zaGllbGRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX2FjdGlvbltkYXRhLnNoaWVsZF9pZF0gLSAxXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLnNoaWVsZF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLnNoaWVsZF9pZF0gLSAxXHJcbiAgICAgICAgICB2YXIgc2hpZWxkID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5zaGllbGRfaWRdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHNoaWVsZC5uYW1lICsgXCIg0LfQsNGJ0LjRgtC40LsgXCIgKyAgdGFyZ2V0Lm5hbWUgKyBcIiAoK1wiICsgZGF0YS5ib251c19LRCArIFwi0LrQtClcIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEudGFyZ2V0X2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLnRhcmdldF9pZF0gKyBkYXRhLmJvbnVzX0tEXHJcbiAgICAgICAgICB2YXIgYmlnX2Jyb19vYmplY3QgPSB7fVxyXG4gICAgICAgICAgYmlnX2Jyb19vYmplY3QuY29vbGRvd24gPSBjb29sZG93bl9iaWdfYnJvXHJcbiAgICAgICAgICBiaWdfYnJvX29iamVjdC5ib251c19LRCA9IGRhdGEuYm9udXNfS0RcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLmJpZ19icm8gPSBiaWdfYnJvX29iamVjdFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgdmFyIHNoaWVsZCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEuY2hhcmFjdGVyX251bWJlcl1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmNoYXJhY3Rlcl9udW1iZXJdID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gLSAxXHJcbiAgICAgICAgICBpZiAoZGF0YS5vdXRjb21lID09IFwic2hpZWxkX3VwXCIpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2RhdGEuY2hhcmFjdGVyX251bWJlcl0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSArIHNoaWVsZF91cF9LRFxyXG4gICAgICAgICAgICB2YXIgc2hpZWxkX3VwX29iamVjdCA9IHt9XHJcbiAgICAgICAgICAgIHNoaWVsZF91cF9vYmplY3Quc3RhbWluYV9jb3N0ID0gc2hpZWxkX3VwX3N0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICBzaGllbGRfdXBfb2JqZWN0LktEID0gc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXS5zaGllbGRfdXAgPSBzaGllbGRfdXBfb2JqZWN0XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQv9C+0LTQvdGP0Lsg0YnQuNGC0Ysg0LfQsCDRh9Cw0YJcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfS0RbZGF0YS5jaGFyYWN0ZXJfbnVtYmVyXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19LRFtkYXRhLmNoYXJhY3Rlcl9udW1iZXJdIC0gc2hpZWxkX3VwX0tEXHJcbiAgICAgICAgICAgIGRlbGV0ZSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuY2hhcmFjdGVyX251bWJlcl0uc2hpZWxkX3VwXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gc2hpZWxkLm5hbWUgKyBcIiDQvtC/0YPRgdGC0LjQuyDRidC40YIuINCn0LDRgiDQv9GA0L7RgdGC0LgoXCJcclxuICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgICAgIHZhciB0YXJnZXQgPSBjaGFyYWN0ZXJfZGV0YWlsZWRfaW5mb1tkYXRhLnRhcmdldF9pZF1cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltkYXRhLmF0dGFja2VyX2lkXSAtIDFcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuYXR0YWNrZXJfaWRdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2VcclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5oYXNPd25Qcm9wZXJ0eShcIk1hcmt1c19zdGFja3NcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLnRhcmdldF9pZF0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS50YXJnZXRfaWRdLk1hcmt1c19zdGFja3MgKyAyXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEudGFyZ2V0X2lkXS5NYXJrdXNfc3RhY2tzID0gMlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0uaGFzT3duUHJvcGVydHkoXCJiaW9wb29sXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5hdHRhY2tlcl9pZF0uYmlvcG9vbCArIGRhdGEuZGFtYWdlXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2RhdGEuYXR0YWNrZXJfaWRdLmJpb3Bvb2wgPSBkYXRhLmRhbWFnZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0L3QsNC90L7RgdC40YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIFwiICsgZGF0YS5kYW1hZ2UgKyBcIiDRg9GA0L7QvdCwINC+0YIg0LrQvtGC0L7RgNC+0LPQviDQvdC10LLQvtC30LzQvtC20L3QviDRg9Cy0LXRgNC90YPRgtGM0YHRj1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICB2YXIgaGVhbGVyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5oZWFsZXJfaWRdXHJcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS50YXJnZXRfaWRdXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuYm9udXNfYWN0aW9uW2RhdGEuaGVhbGVyX2lkXSA9IGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25bZGF0YS5oZWFsZXJfaWRdIC0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5oZWFsZXJfaWRdID0gY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5oZWFsZXJfaWRdIC0gMVxyXG5cclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdICsgZGF0YS5oZWFsX2Ftb3VudFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tkYXRhLmhlYWxlcl9pZF0uYmlvcG9vbCA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbZGF0YS5oZWFsZXJfaWRdLmJpb3Bvb2wgLSBkYXRhLmhlYWxfYW1vdW50XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGhlYWxlci5uYW1lICsgXCIg0LLQvtC+0YHRgtCw0L3QsNC70LjQstCw0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgXCIgKyBkYXRhLmhlYWxfYW1vdW50ICsgXCIg0YXQv1wiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGFsZXJ0KFwiUmVjZWl2ZWQgdW5rbm93biBza2lsbCBjb21tYW5kXCIpXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICduZXdfcm91bmRfcmVzcG9uc2UnKSB7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gXCLQndCw0YfQsNC70L4g0L3QvtCy0L7Qs9C+INGA0LDRg9C90LTQsCFcIlxyXG4gICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNoYXJhY3RlciA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2ldXHJcbiAgICAgICAgaWYgKGNoYXJhY3RlciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2ldID0gMVxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gbW92ZV9hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5ib251c19hY3Rpb25baV0gPSBib251c19hY3Rpb25fbWFwW2NoYXJhY3Rlci5hZ2lsaXR5XTtcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5tYWluX2FjdGlvbltpXSA9IG1haW5fYWN0aW9uX21hcFtjaGFyYWN0ZXIuYWdpbGl0eV07XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImFkcmVuYWxpbmVcIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZS5jb29sZG93biA9PSAzKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG1pbnVzX2FjdGlvbnMgPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmFkcmVuYWxpbmUubWludXNfYWN0aW9uc1xyXG4gICAgICAgICAgICAgIHdoaWxlIChtaW51c19hY3Rpb25zID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1pbnVzX2FjdGlvbnMgJSAyID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldID0gY2hhcmFjdGVyX3N0YXRlLm1haW5fYWN0aW9uW2ldIC0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbWludXNfYWN0aW9ucyA9IG1pbnVzX2FjdGlvbnMgLSAxXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZS5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZS5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZS5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYWRyZW5hbGluZVxyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gXCLQo9C80LXQvdC40LUg0J/RgNC40LvQuNCyINCQ0LTRgNC10L3QsNC70LjQvdCwINGDIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDRgdC90L7QstCwINC00L7RgdGC0YPQv9C90L4uXCJcclxuICAgICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmhhc093blByb3BlcnR5KFwiY3V0X2xpbWJcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLm1vdmVfYWN0aW9uW2ldID0gLTEwXHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWIuY29vbGRvd24gPSBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLmN1dF9saW1iLmNvb2xkb3duIC0gMVxyXG4gICAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5jdXRfbGltYi5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uY3V0X2xpbWJcclxuICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwi0KHRg9GF0L7QttC40LvQuNGPIFwiICsgY2hhcmFjdGVyLm5hbWUgKyBcIiDQstC+0YHRgdGC0LDQvdC+0LLRj9GC0YHRjyDQvdCwINGB0LvQtdC00YPRjtGJ0LXQvCDRhdC+0LTRgy5cIlxyXG4gICAgICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJNYXJrdXNfc3RhY2tzXCIpKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyAtIDFcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrcyA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uTWFya3VzX3N0YWNrc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uaGFzT3duUHJvcGVydHkoXCJzaGllbGRfdXBcIikpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbaV0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtpXSAtIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc2hpZWxkX3VwLnN0YW1pbmFfY29zdFxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGNoYXJhY3Rlci5uYW1lICsgXCIg0L/RgNC+0LTQvtC70LbQsNC10YIg0LTQtdGA0LbQsNGC0Ywg0YnQuNGCICjRgdC/0LDRgdC40LHQvilcIlxyXG4gICAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5oYXNPd25Qcm9wZXJ0eShcImJpZ19icm9cIikpIHtcclxuICAgICAgICAgICAgaWYgKGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldID0gY2hhcmFjdGVyX3N0YXRlLmJvbnVzX0tEW2ldIC0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXS5iaWdfYnJvLmJvbnVzX0tEXHJcbiAgICAgICAgICAgICAgZGVsZXRlIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyb1xyXG4gICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gY2hhcmFjdGVyLm5hbWUgKyBcIiDRgtC10YDRj9C10YIg0LfQsNGJ0LjRgtGDINCR0L7Qu9GM0YjQvtCz0L4g0JHRgNCw0YLQsFwiXHJcbiAgICAgICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biA9IGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uYmlnX2Jyby5jb29sZG93biAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGNoYXJhY3Rlci5zcGVjaWFsX3R5cGUgPT0gJ3NuaXBlcicpIHtcclxuICAgICAgICAgICAgdmFyIGVmZmVjdHNfb2JqZWN0ID0gY2hhcmFjdGVyX3N0YXRlLnNwZWNpYWxfZWZmZWN0c1tpXVxyXG4gICAgICAgICAgICBpZiAoZWZmZWN0c19vYmplY3QuaGFzT3duUHJvcGVydHkoXCJzbmlwZXJfcGFzc2l2ZVwiKSkge1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2F0dGFja19ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmF0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIHZhciBjdXJyZW50X2RhbWFnZV9ib251cyA9IGVmZmVjdHNfb2JqZWN0LnNuaXBlcl9wYXNzaXZlLmRhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGlmIChjdXJyZW50X2F0dGFja19ib251cyA9PSAtNSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld19hdHRhY2tfYm9udXMgPSBNYXRoLm1pbihjdXJyZW50X2F0dGFja19ib251cyArIDEsIDQpXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3X2RhbWFnZV9ib251cyA9IE1hdGgubWluKGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgMiwgOClcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmF0dGFja19ib251c1tpXSA9IGNoYXJhY3Rlcl9zdGF0ZS5hdHRhY2tfYm9udXNbaV0gLSBjdXJyZW50X2F0dGFja19ib251cyArIG5ld19hdHRhY2tfYm9udXNcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuZGFtYWdlX2JvbnVzW2ldID0gY2hhcmFjdGVyX3N0YXRlLmRhbWFnZV9ib251c1tpXSAtIGN1cnJlbnRfZGFtYWdlX2JvbnVzICsgbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuYXR0YWNrX2JvbnVzID0gbmV3X2F0dGFja19ib251c1xyXG4gICAgICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5zcGVjaWFsX2VmZmVjdHNbaV0uc25pcGVyX3Bhc3NpdmUuZGFtYWdlX2JvbnVzID0gbmV3X2RhbWFnZV9ib251c1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHZhciBzbmlwZXJfcGFzc2l2ZV9vYmplY3QgPSB7fVxyXG4gICAgICAgICAgICAgIHNuaXBlcl9wYXNzaXZlX29iamVjdC5hdHRhY2tfYm9udXMgPSAwXHJcbiAgICAgICAgICAgICAgc25pcGVyX3Bhc3NpdmVfb2JqZWN0LmRhbWFnZV9ib251cyA9IDBcclxuICAgICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuc3BlY2lhbF9lZmZlY3RzW2ldLnNuaXBlcl9wYXNzaXZlID0gc25pcGVyX3Bhc3NpdmVfb2JqZWN0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdiYXR0bGVfbW9kX3Jlc3BvbnNlJykge1xyXG4gICAgICBiYXR0bGVfbW9kID0gZGF0YS52YWx1ZVxyXG4gICAgICBpZiAoYmF0dGxlX21vZCA9PSAwKSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCR0L7QuSDQvtC60L7QvdGH0LXQvSEg0J3QsNGB0YLRg9C/0LjQuyDQvNC40YAg0LLQviDQstGB0LXQvCDQvNC40YDQtVwiXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcItCd0LDRh9Cw0LvQviDQsdC+0Y8hINCb0Y7QtNC4INGD0LzQuNGA0LDRjtGCLCDQtdGB0LvQuCDQuNGFINGD0LHQuNGC0YxcIlxyXG4gICAgICB9XHJcbiAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgIH0gZWxzZSBpZiAoZGF0YS5jb21tYW5kID09ICdyZXNvbHZlX2F0dGFja19yZXNwb25zZScpIHtcclxuICAgICAgdmFyIGF0dGFja2VyID0gY2hhcmFjdGVyX2RldGFpbGVkX2luZm9bZGF0YS5hdHRhY2tlcl9pZF1cclxuICAgICAgdmFyIHRhcmdldCA9IGNoYXJhY3Rlcl9kZXRhaWxlZF9pbmZvW2RhdGEudGFyZ2V0X2lkXVxyXG4gICAgICBpZiAoYmF0dGxlX21vZCA9PSAxKSB7XHJcbiAgICAgICAgY2hhcmFjdGVyX3N0YXRlLnN0YW1pbmFbZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuc3RhbWluYVtkYXRhLmF0dGFja2VyX2lkXSAtIHN0YW1pbmFfYXR0YWNrX2Nvc3RcclxuICAgICAgICBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUubWFpbl9hY3Rpb25bZGF0YS5hdHRhY2tlcl9pZF0gLSAxXHJcbiAgICAgIH1cclxuICAgICAgc3dpdGNoIChkYXRhLm91dGNvbWUpIHtcclxuICAgICAgICBjYXNlIFwiS0RfYmxvY2tcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvdC+INC90LUg0L/RgNC+0LHQuNCy0LDQtdGCINCx0YDQvtC90Y4uXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJldmFkZWRcIjpcclxuICAgICAgICAgIHZhciBtZXNzYWdlID0gYXR0YWNrZXIubmFtZSArIFwiINCw0YLQsNC60YPQtdGCIFwiICsgdGFyZ2V0Lm5hbWUgKyBcIiAoXCIgKyBkYXRhLmF0dGFja19yb2xsICsgXCIpLCDQvtC00L3QsNC60L4gXCIgKyB0YXJnZXQubmFtZSArIFwiINGD0LTQsNC70L7RgdGMINGD0LLQtdGA0L3Rg9GC0YzRgdGPIChcIiArIGRhdGEuZXZhZGVfcm9sbCArIFwiKS5cIlxyXG4gICAgICAgICAgcHVzaFRvTGlzdChtZXNzYWdlKVxyXG4gICAgICAgICAgaWYgKHRhcmdldC5zcGVjaWFsX3R5cGUgIT0gJ3JvZ3VlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuY2FuX2V2YWRlW2RhdGEudGFyZ2V0X2lkXSA9IDBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2Vfd2l0aG91dF9ldmFzaW9uXCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDRg9GB0L/QtdGI0L3QviDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIgKFwiICsgZGF0YS5hdHRhY2tfcm9sbCArIFwiKSwg0LrQvtGC0L7RgNGL0Lkg0LHQvtC70YzRiNC1INC90LUg0LzQvtC20LXRgiDRg9Cy0L7RgNCw0YfQuNCy0LDRgtGM0YHRjy4g0JDRgtCw0LrQsCDQvdCw0L3QvtGB0LjRgiBcIiArIGRhdGEuZGFtYWdlX3JvbGwgKyBcIiDRg9GA0L7QvdCwLlwiXHJcbiAgICAgICAgICBwdXNoVG9MaXN0KG1lc3NhZ2UpXHJcbiAgICAgICAgICBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdID0gY2hhcmFjdGVyX3N0YXRlLkhQW2RhdGEudGFyZ2V0X2lkXSAtIGRhdGEuZGFtYWdlX3JvbGxcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkYW1hZ2VfYWZ0ZXJfZXZhc2lvblwiOlxyXG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSBhdHRhY2tlci5uYW1lICsgXCIg0YPRgdC/0LXRiNC90L4g0LDRgtCw0LrRg9C10YIgXCIgKyB0YXJnZXQubmFtZSArIFwiIChcIiArIGRhdGEuYXR0YWNrX3JvbGwgKyBcIiksINC60L7RgtC+0YDRi9C5INC90LUg0YHQvNC+0LMg0YPQstC10YDQvdGD0YLRjNGB0Y8gKFwiICsgZGF0YS5ldmFkZV9yb2xsICsgXCIpLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgY2hhcmFjdGVyX3N0YXRlLmNhbl9ldmFkZVtkYXRhLnRhcmdldF9pZF0gPSAwXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZnVsbF9jcml0XCI6XHJcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IGF0dGFja2VyLm5hbWUgKyBcIiDQutGA0LjRgtC40YfQtdGB0LrQuCDQsNGC0LDQutGD0LXRgiBcIiArIHRhcmdldC5uYW1lICsgXCIsINC90LUg0L7RgdGC0LDQstC70Y/RjyDQstC+0LfQvNC+0LbQvdC+0YHRgtC4INGD0LLQtdGA0L3Rg9GC0YzRgdGPLiDQkNGC0LDQutCwINC90LDQvdC+0YHQuNGCIFwiICsgZGF0YS5kYW1hZ2Vfcm9sbCArIFwiINGD0YDQvtC90LAuXCJcclxuICAgICAgICAgIHB1c2hUb0xpc3QobWVzc2FnZSlcclxuICAgICAgICAgIGNoYXJhY3Rlcl9zdGF0ZS5IUFtkYXRhLnRhcmdldF9pZF0gPSBjaGFyYWN0ZXJfc3RhdGUuSFBbZGF0YS50YXJnZXRfaWRdIC0gZGF0YS5kYW1hZ2Vfcm9sbFxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnVja2VkIHVwIHJlc29sdmluZyBkYW1hZ2VcIilcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEuY29tbWFuZCA9PSAnc2VhcmNoX2FjdGlvbl9yZXNwb25zZScpIHtcclxuICAgICAgaWYgKG15X3JvbGUgPT0gJ2dtJykge1xyXG4gICAgICAgIHB1c2hUb0xpc3QoZGF0YS5jaGFyYWN0ZXJfbmFtZSArICcg0LHRgNC+0YHQuNC7ICcgKyBkYXRhLnJvbGwgKyAnINC90LAg0LLQvdC40LzQsNGC0LXQu9GM0L3QvtGB0YLRjCDQsiDQt9C+0L3QtSAnICsgZGF0YS56b25lX251bWJlcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmFyIGNyZWF0ZV9ib2FyZF9idXR0b24gPSAkKENSRUFURV9CT0FSRF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jcmVhdGVfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUJvYXJkKTtcclxuY3JlYXRlX2JvYXJkX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgc2F2ZV9ib2FyZF9idXR0b24gPSAkKFNBVkVfQk9BUkRfQlVUVE9OX1NFTEVDVE9SKTtcclxuc2F2ZV9ib2FyZF9idXR0b24ub24oJ2NsaWNrJywgc2F2ZUJvYXJkKTtcclxuc2F2ZV9ib2FyZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGxvYWRfYm9hcmRfYnV0dG9uID0gJChMT0FEX0JPQVJEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLm9uKCdjbGljaycsIGxvYWRCb2FyZCk7XHJcbmxvYWRfYm9hcmRfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciByb2xsX2luaXRpYXRpdmVfYnV0dG9uID0gJChST0xMX0lOSVRJQVRJVkVfQlVUVE9OX1NFTEVDVE9SKTtcclxucm9sbF9pbml0aWF0aXZlX2J1dHRvbi5vbignY2xpY2snLCByb2xsSW5pdGlhdGl2ZSk7XHJcbnJvbGxfaW5pdGlhdGl2ZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGZvZ19idXR0b24gPSAkKEZPR19CVVRUT05fU0VMRUNUT1IpO1xyXG5mb2dfYnV0dG9uLm9uKCdjbGljaycsIGZvZ01vZGVDaGFuZ2UpO1xyXG5mb2dfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB6b25lX2J1dHRvbiA9ICQoWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG56b25lX2J1dHRvbi5vbignY2xpY2snLCB6b25lTW9kZUNoYW5nZSk7XHJcbnpvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciBjaGF0X2J1dHRvbiA9ICQoQ0hBVF9CVVRUT05fU0VMRUNUT1IpO1xyXG5jaGF0X2J1dHRvbi5vbignY2xpY2snLCBjaGFuZ2VDaGF0VmlzaWJpbGl0eSk7XHJcblxyXG52YXIgbWlycm9yX2J1dHRvbiA9ICQoTUlSUk9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbm1pcnJvcl9idXR0b24ub24oJ2NsaWNrJywgbWlycm9yX2JvYXJkKTtcclxubWlycm9yX2J1dHRvbi5oaWRlKCk7XHJcblxyXG52YXIgbmV4dF9yb3VuZF9idXR0b24gPSAkKE5FWFRfUk9VTkRfQlVUVE9OX1NFTEVDVE9SKTtcclxubmV4dF9yb3VuZF9idXR0b24ub24oJ2NsaWNrJywgc3RhcnRfbmV3X3JvdW5kKTtcclxubmV4dF9yb3VuZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGJhdHRsZV9tb2RfYnV0dG9uID0gJChCQVRUTEVfTU9EX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmJhdHRsZV9tb2RfYnV0dG9uLm9uKCdjbGljaycsIGNoYW5nZV9iYXR0bGVfbW9kKTtcclxuYmF0dGxlX21vZF9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIGZvZ196b25lX2J1dHRvbiA9ICQoRk9HX1pPTkVfQlVUVE9OX1NFTEVDVE9SKTtcclxuZm9nX3pvbmVfYnV0dG9uLm9uKCdjbGljaycsIGZvZ0N1cnJlbnRab25lKTtcclxuZm9nX3pvbmVfYnV0dG9uLmhpZGUoKTtcclxuXHJcbnZhciB1bmZvZ196b25lX2J1dHRvbiA9ICQoVU5GT0dfWk9ORV9CVVRUT05fU0VMRUNUT1IpO1xyXG51bmZvZ196b25lX2J1dHRvbi5vbignY2xpY2snLCB1bmZvZ0N1cnJlbnRab25lKTtcclxudW5mb2dfem9uZV9idXR0b24uaGlkZSgpO1xyXG5cclxudmFyIHpvbmVfbnVtYmVyX3NlbGVjdCA9ICQoWk9ORV9OVU1CRVJfU0VMRUNUT1IpO1xyXG56b25lX251bWJlcl9zZWxlY3QuaGlkZSgpO1xyXG5mb3IgKGxldCBpID0gMTsgaSA8IE1BWF9aT05FUzsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfb3B0aW9uID0gJChcIjxvcHRpb24+XCIpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnRleHQoJ9CX0L7QvdCwICcgKyBpKTtcclxuICBjdXJyZW50X29wdGlvbi52YWwoaSk7XHJcbiAgem9uZV9udW1iZXJfc2VsZWN0LmFwcGVuZChjdXJyZW50X29wdGlvbik7XHJcbn1cclxuXHJcbnZhciBzZWFyY2hfbW9kaWZpY2F0b3IgPSAkKFNFQVJDSF9NT0RJRklDQVRPUl9TRUxFQ1RPUik7XHJcbnNlYXJjaF9tb2RpZmljYXRvci5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19saXN0ID0gJChOT1RJRklDQVRJT05TX0xJU1RfU0VMRUNUT1IpO1xyXG5mb3IgKGxldCBpID0gMDsgaSA8IENIQVRfQ0FTSDsgaSsrKSB7XHJcbiAgdmFyIGN1cnJlbnRfZWxlbWVudCA9ICQoXCI8bGk+XCIpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdkYXRhLW5hbWUnLCAnbm90aWZpY2F0aW9uc19saXN0X2VsZW1lbnRfJyArIGkpO1xyXG4gIGN1cnJlbnRfZWxlbWVudC5hdHRyKCdjbGFzcycsICdub3RpZmljYXRpb25zX2xpc3RfZWxlbWVudCcpO1xyXG4gIG5vdGlmaWNhdGlvbnNfbGlzdC5hcHBlbmQoY3VycmVudF9lbGVtZW50KTtcclxufVxyXG5cclxudmFyIGJvYXJkX3NpemVfaW5wdXQgPSAkKEJPQVJEX1NJWkVfSU5QVVRfU0VMRUNUT1IpO1xyXG5ib2FyZF9zaXplX2lucHV0LmhpZGUoKTtcclxuXHJcbnZhciBzYXZlX25hbWVfaW5wdXQgPSAkKFNBVkVfTkFNRV9JTlBVVF9TRUxFQ1RPUik7XHJcbnNhdmVfbmFtZV9pbnB1dC5oaWRlKCk7XHJcblxyXG52YXIgbm90aWZpY2F0aW9uc19jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vdGlmaWNhdGlvbnMtY29udGFpbmVyXCIpO1xyXG5ub3RpZmljYXRpb25zX2NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuc2V0SW50ZXJ2YWwocmVjb25uZWN0LCAzMCoxMDAwKVxyXG4iLCJsZXQgc29ja2V0O1xyXG5sZXQgc2VydmVyX2FkZHJlc3M7XHJcbmxldCBvbk1lc3NhZ2VGdW5jdGlvbjtcclxuXHJcbmZ1bmN0aW9uIGluaXQodXJsKSB7XHJcbiAgc2VydmVyX2FkZHJlc3MgPSB1cmw7XHJcbiAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gIGNvbnNvbGUubG9nKCdjb25uZWN0aW5nLi4nKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNSZWFkeSgpIHtcclxuICByZXR1cm4gc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKSB7XHJcbiAgc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdvcGVuJyk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oKTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKGhhbmRsZXJGdW5jdGlvbikge1xyXG4gIG9uTWVzc2FnZUZ1bmN0aW9uID0gaGFuZGxlckZ1bmN0aW9uO1xyXG4gIHNvY2tldC5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xyXG4gICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQoKSB7XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIG9uTWVzc2FnZUZ1bmN0aW9uKGRhdGEpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKHBheWxvYWQpIHtcclxuICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShwYXlsb2FkKSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluaXQoc2VydmVyX2FkZHJlc3MpO1xyXG4gICAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihvbk1lc3NhZ2VGdW5jdGlvbik7XHJcbiAgICBpZiAoc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOKSB7XHJcbiAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdOb3Qgc2VuZCwgYnV0IHJlY29ubmVjdGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgaW5pdCxcclxuICByZWdpc3Rlck9wZW5IYW5kbGVyLFxyXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXHJcbiAgc2VuZE1lc3NhZ2UsXHJcbiAgcmVnaXN0ZXJNZXNzYWdlSGFuZGxlckRlZmF1bHQsXHJcbiAgaXNSZWFkeVxyXG59XHJcbiJdfQ==
