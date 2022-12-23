import socket from './ws-client';

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

var stamina_weakspot_cost = 1
var stamina_move_cost = 1
var stamina_attack_cost = 1
var stamina_cut_limb_cost = 3

var cooldown_cut_limb = 1


// This is a constant, will be moved to database later
const HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415];
const stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195];
const strength_damage_map = [-2, 0, 1, 2, 3, 5, 7, 10, 13, 17, 21]
const move_action_map = [1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3]
const bonus_action_map= [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3]
const main_action_map = [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2]


let game_state = {board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: []};
let character_state = {HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], KD_points: [], current_weapon: [], visibility: [], attack_bonus: [], damage_bonus: [], special_effects: []}

let character_base = [];
let obstacle_base = [];

let gm_control_mod = 0; // normal mode
let battle_mod = 0

let field_chosen = 0;
let chosen_index;
let chosen_character_index;

let attack = {in_process: 0, weapon_id: 0, attacker_id: 0, attacker_position: 0};
let targeted_skill = {in_process: 0, skill_id: 0, attacker_id: 0, attacker_position: 0}


let last_obstacle = 1;

function reconnect() {
  if (!socket.isReady()) {
    socket.init(SERVER_ADDRESS);
    socket.registerMessageHandlerDefault();
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

  for (let i = 0; i < game_state.size * game_state.size; i++) {
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
  socket.sendMessage(toSend);
}

function send_construct_command(new_game_state) {
  var toSend = {};
  toSend.command = 'construct_board';
  toSend.room_number = my_room;
  toSend.game_state = new_game_state;
  socket.sendMessage(toSend);
}

function no_shift_onclick(my_role, gm_control_mod, game_state, field_chosen, cell, index) {
  var character_profile_container = document.getElementById("character-info-container");
  character_profile_container.innerHTML = "";
  var weapon_container = document.getElementById("weapon-info-container");
  weapon_container.innerHTML = "";

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

  for (let i = 0; i < game_state.size; i++) {
    var row = document.createElement("tr");
    row.className = "board_row";
    for (let j = 0; j < game_state.size; j++) {
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
      button.onclick = function(event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;

        if (event.shiftKey) {
          var toSend = {};
          toSend.command = 'add_obstacle';
          toSend.cell_id = index;
          toSend.obstacle_number = last_obstacle;
          toSend.obstacle_name = obstacle_list[last_obstacle - 1];
          toSend.room_number = my_room;
          socket.sendMessage(toSend);
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, field_chosen, cell, index)
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
  socket.sendMessage(toSend);
}

function fogOrPic(cell_id) {
  var picture_name = FOG_IMAGE;
  if ((game_state.fog_state[cell_id] != 1)||(my_role == 'gm')) {
    picture_name = get_object_picture(game_state.board_state[cell_id]);
  }
  return picture_name;
}

function standard_cell_onClick(index, cell, role) {
	if (game_state.board_state[index] == 0) { // empty cell clicked
		if (field_chosen == 0) {
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
          if (role == 'gm') {
			       add_object(index);
          }
        } else {
          perform_skill(index, cell)
        }
     } else {
       stop_attack()
     }
		} else {
			move_character(index, cell);
		}
	} else if (game_state.board_state[index] > 0) { // character clicked
		if (field_chosen == 0) {
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
			     select_character(index, cell);
        } else {
          perform_skill(index, cell)
        }
      } else {
        perform_attack(index, cell)
      }
		} else {
			undo_selection();
		}
	} else { // obstacle clicked
		if (field_chosen == 0) {
      if (attack.in_process == 0) {
        if (targeted_skill.in_process == 0) {
			     select_obstacle(index, cell);
        } else {
          stop_skill()
        }
      } else {
        stop_attack()
      }
		} else {
			undo_selection();
		}
	}
}

function isInRange(index1, index2, range) {
  var x1 = Math.floor(index1/game_state.size)
  var y1 = index1 % game_state.size

  var x2 = Math.floor(index2/game_state.size)
  var y2 = index2 % game_state.size

  var distance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  return distance <= range*range
}

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1
}


function applyFog(index, cell) {
	if (game_state.fog_state[index] == 1) {
		// send update message
		var toSend = {};
		toSend.command = 'update_fog';
		toSend.update_type = 'remove';
		toSend.index = index;
    toSend.room_number = my_room;
		socket.sendMessage(toSend);
	} else {
		// send update message
		var toSend = {};
		toSend.command = 'update_fog';
		toSend.update_type = 'add';
		toSend.index = index;
    toSend.room_number = my_room;
		socket.sendMessage(toSend);
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
  button_add_character.onclick = function() {
    add_character(board_index);
  };

  var button_add_obstacle = document.createElement("button");
  button_add_obstacle.innerHTML = "Добавить препятствие";
  button_add_obstacle.onclick = function() {
    add_obstacle(board_index);
  };

  button_container.appendChild(button_add_character);
  button_container.appendChild(button_add_obstacle);
  container.appendChild(button_container);

  tiny_animation(container);
}

function tiny_animation(container) {
  container.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    container.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function add_obstacle(board_index) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var select = document.createElement("select");
  select.id = "obstacle_chosen";

  for (let i = 0; i < obstacle_list.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = obstacle_list[i];
    current_option.value = i;
    select.appendChild(current_option);
  }

  var button = document.createElement("button");
  button.innerHTML = "Добавить";
  button.board_index = board_index;
  button.onclick = function(event) {
    var button = event.target;
    var obstacle_number = parseInt(document.getElementById("obstacle_chosen").value);

    var toSend = {};
    toSend.command = 'add_obstacle';
    toSend.cell_id = button.board_index;
    toSend.obstacle_number = obstacle_number + 1;
    toSend.obstacle_name = obstacle_list[obstacle_number];
    toSend.room_number = my_room;
    socket.sendMessage(toSend);

    var container = document.getElementById("character-info-container");
    container.innerHTML = "";
  }

  container.appendChild(select);
  container.appendChild(button);
  tiny_animation(container);

}

function add_character(board_index) {
  var container = document.getElementById("character-info-container");
  container.innerHTML = "";

  var select = document.createElement("select");
  select.id = "character_chosen";

  for (let i = 0; i < character_list.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = character_list[i];
    current_option.value = i;
    select.appendChild(current_option);
  }

  var button = document.createElement("button");
  button.innerHTML = "Добавить";
  button.board_index = board_index;
  button.onclick = function(event) {
    var button = event.target;
    var character_number = parseInt(document.getElementById("character_chosen").value);

    var toSend = {};
    toSend.command = 'add_character';
    toSend.cell_id = button.board_index;
    toSend.character_number = character_number + 1;
    toSend.character_name = character_list[character_number];
    toSend.room_number = my_room;
    socket.sendMessage(toSend);

    var container = document.getElementById("character-info-container");
    container.innerHTML = "";
  }

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
  socket.sendMessage(toSend);
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
  var character_number = game_state.board_state[index]
  var character = character_detailed_info[character_number];

  let name = character.name;
  let avatar = character.avatar;

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

  var hp_percent = parseFloat(character_state.HP[character_number])/parseFloat(HP_values[character.stamina])
  hp_percent = Math.floor(hp_percent*100)

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
  container.appendChild(HP_display);
  container.appendChild(tired_display);
  container.appendChild(initiative_display);

  var move_button = document.createElement("button");
  move_button.innerHTML = "Перемещение";
  move_button.index = index;
  move_button.cell = cell;
  move_button.onclick = function(event) {
    var character_picked = event.target
    var character_number = game_state.board_state[character_picked.index];
    var move_actions_left = character_state.move_action[character_number]
    if (move_actions_left > 0) {
      var container = document.getElementById("character-info-container");
      container.innerHTML = "";
      var weapon_container = document.getElementById("weapon-info-container");
      weapon_container.innerHTML = "";
      choose_character_to_move(character_picked.index, character_picked.cell);
    } else {
      alert("Вы потратили все перемещения на этом ходу!")
    }
  }

  if (my_role == "gm") {

    var delete_button = document.createElement("button");
    delete_button.innerHTML = "Уничтожить";
    delete_button.index = index;
    delete_button.cell = cell;
    delete_button.onclick = function(event) {
      delete_object(event);
    }

    var change_character_visibility_button = document.createElement("button");
    change_character_visibility_button.innerHTML = "Изменить видимость";
    change_character_visibility_button.onclick = function(event) {
      change_character_visibility(character_number);
    }

    var damage_button = document.createElement("button");
    damage_button.innerHTML = "Нанести урон";
    damage_button.index = index;
    damage_button.onclick = function(event) {
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
        socket.sendMessage(toSend);
      }
  }

    var damage_field = document.createElement("input");
    damage_field.id = "damage_field";
    damage_field.type = "number";
    damage_field.placeholder = "Значение урона";

  }

  var search_button = document.createElement("button");
  search_button.innerHTML = "Обыскать";
  search_button.index = index;
  search_button.onclick = function(event) {
    search_action(event.target);
  }

  var simple_roll_button = document.createElement("button");
  simple_roll_button.innerHTML = "Просто d20";
  simple_roll_button.onclick = function(event) {
    var roll = roll_x(20)
    var toSend = {}
    toSend.command = "simple_roll"
    toSend.character_name = character.name
    toSend.room_number = my_room
    toSend.roll = roll
    socket.sendMessage(toSend);
  }

  var weapon_select = document.createElement("select");
  weapon_select.id = "weapon_chosen";

  var inventory = character.inventory

  for (let i = 0; i < inventory.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = weapon_list[inventory[i]];
    current_option.value = inventory[i];
    weapon_select.appendChild(current_option);
  }

  var pick_weapon_button = document.createElement("button");
  pick_weapon_button.innerHTML = "Сменить оружие";
  pick_weapon_button.index = index;
  pick_weapon_button.onclick = function(event) {
    var weapon_select = document.getElementById("weapon_chosen")
    var weapon_index = weapon_select.value
    character_state.current_weapon[character_number] = weapon_index
    var weapon = weapon_detailed_info[weapon_index]

    var weapon_range_display = document.getElementById("weapon_range_display")
    weapon_range_display.innerHTML = "Дальность: " + weapon.range

    var weapon_damage_display = document.getElementById("weapon_damage_display")
    weapon_damage_display.innerHTML = "Урон: " + weapon.damage[0] + 'd' + weapon.damage[1]

    var weapon_name_display = document.getElementById("weapon_name_display")
    weapon_name_display.innerHTML = weapon.name

    var weapon_avatar_display = document.getElementById("weapon_avatar_display")
    weapon_avatar_display.src = weapon.avatar;
    weapon_avatar_display.style.width = '250px';
    weapon_avatar_display.style.height = '250px';
  }

  var default_weapon_index = character_state.current_weapon[character_number]
  var default_weapon = weapon_detailed_info[default_weapon_index]

  var weapon_range_display = document.createElement("h2");
  weapon_range_display.id = "weapon_range_display";
  weapon_range_display.innerHTML = "Дальность: " + default_weapon.range

  var weapon_damage_display = document.createElement("h2");
  weapon_damage_display.id = "weapon_damage_display";
  weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1]

  var weapon_avatar_display = document.createElement("IMG");
  weapon_avatar_display.id = "weapon_avatar_display"
  weapon_avatar_display.src = default_weapon.avatar;
  weapon_avatar_display.style.width = '250px';
  weapon_avatar_display.style.height = '250px';

  var weapon_name_display = document.createElement("h2");
  weapon_name_display.id = "weapon_name_display";
  weapon_name_display.innerHTML = default_weapon.name

  weapon_container.append(weapon_name_display)
  weapon_container.append(weapon_avatar_display)
  weapon_container.append(weapon_range_display)
  weapon_container.append(weapon_damage_display)

  var attack_button = document.createElement("button");
  attack_button.innerHTML = "Атаковать";
  attack_button.onclick = function(event) {
    var main_actions_left = character_state.main_action[character_number]
    if (main_actions_left > 0) {
      attack.in_process = 1
      attack.weapon_id = character_state.current_weapon[character_number]
      attack.attacker_id = character_number
      attack.attacker_position = index
      field_chosen = 0
      targeted_skill.in_process = 0

      cell.src = "./images/attack_placeholder.jpg";
    } else {
      alert("У вас не осталось действий!")
    }
  }

  var skill_select = document.createElement("select");
  skill_select.id = "skill_chosen";

  var skillset = character.skillset

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
  toSend.character_number = character_number
  toSend.room_number = my_room;

  if (character_state.visibility[character_number] == 0) {
    toSend.new_value = 1
  } else {
    toSend.new_value = 0
  }
  socket.sendMessage(toSend);
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
  socket.sendMessage(toSend);
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
  socket.sendMessage(toSend);
}

function select_obstacle(index, cell) {
  var obstacle_id = game_state.board_state[index] * (-1);
  var obstacle = obstacle_detailed_info[obstacle_id];

  // keep track of last chosen obstale to quickly add to the map
  last_obstacle = obstacle_id

  let name = obstacle.name;
  let avatar = obstacle.avatar;

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
  delete_button.onclick = function(event) {
    delete_object(event);
  }
  container.appendChild(delete_button);

  tiny_animation(container);

}


function choose_character_to_move(index, cell) {
  field_chosen = 1;
  attack.in_process = 0
  targeted_skill.in_process = 0
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
  attack.in_process = 0
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
    index_in_base = index_in_board_state * (-1);
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
  socket.sendMessage(toSend);
}

function computeInitiative(agility) {
  return agility*2 + roll_x(20);
}

function rollInitiative() {
  for (let i = 1; i < character_state.initiative.length; i++) {
    if (character_state.HP[i] > 0) { // so character i is present
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
  socket.sendMessage(toSend);
}

function fogModeChange() {
  if (gm_control_mod != 1) {
    // turn on fog adding mode
    gm_control_mod = 1;
    fog_button.text('Выкл Туман Войны');
		for (let i = 0; i < game_state.size*game_state.size; i++) {
			if (game_state.fog_state[i] == 1) {
				var current_cell = document.getElementById("cell_" + i);
				current_cell.src = FOG_IMAGE;
			}
		}
  } else {
    // turn off fog adding mode
    gm_control_mod = 0;
    fog_button.text('Вкл Туман Войны');
		for (let i = 0; i < game_state.size*game_state.size; i++) {
			if (game_state.fog_state[i] == 1) {
				var current_cell = document.getElementById("cell_" + i);
				current_cell.src = get_object_picture(game_state.board_state[i]);
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

    for (let i = 0; i < game_state.size*game_state.size; i++) {
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

    for (let i = 0; i < game_state.size*game_state.size; i++) {
				var current_zone_text = document.getElementById("zone_text_" + i);
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
  for (let i = 0; i < game_state.size * game_state.size; i++) {
    if (game_state.zone_state[i] == current_zone) {
      toSend.index = i;
      socket.sendMessage(toSend);
    }
  }
}

function pushToList(message) {
  for (let i=1; i < CHAT_CASH; i++) {
    var element_to_copy = $('[data-name="notifications_list_element_' + i + '"]');
    var element_to_paste = $('[data-name="notifications_list_element_' + (i-1) + '"]');

    element_to_paste.text(element_to_copy.text());
  }
  var top_element = $('[data-name="notifications_list_element_' + (CHAT_CASH-1) + '"]');
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
  socket.sendMessage(toSend);
}

function perform_attack(index, cell) {
  var weapon = weapon_detailed_info[attack.weapon_id]

  if (isInRange(index, attack.attacker_position, weapon.range)) {

    var target_character_number = game_state.board_state[index]
    var target_character_KD = parseInt(character_state.KD_points[target_character_number])
    var target_character = character_detailed_info[target_character_number]
    var attacking_character = character_detailed_info[attack.attacker_id]
    var attack_roll = roll_x(20)

    var toSend = {};
    toSend.command = 'resolve_attack';
    toSend.room_number = my_room;
    toSend.attacker_id = attack.attacker_id
    toSend.target_id = target_character_number

    if (attack_roll < 20) {// no crit
      if (weapon.type == "ranged") {
        var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence)
      } else if (weapon.type == "melee") {
        var cumulative_attack_roll = attack_roll + parseInt(attacking_character.agility)
      }

      var attack_bonus = character_state.attack_bonus[attack.attacker_id]
      console.log(attack_bonus)
      cumulative_attack_roll = cumulative_attack_roll + attack_bonus

      toSend.attack_roll = cumulative_attack_roll

      if (cumulative_attack_roll > target_character_KD) {// Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility)
          toSend.evade_roll = evade_roll
          if (evade_roll > cumulative_attack_roll) { //succesfully evaded
            toSend.outcome = "evaded"
          } else {
            var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number)
            toSend.damage_roll = damage_roll
            toSend.outcome = "damage_after_evasion"
          }
        } else {
          var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number)
          toSend.damage_roll = damage_roll
          toSend.outcome = "damage_without_evasion"
        }
      } else {
        toSend.outcome = "KD_block"
      }
    } else { // full crit
      toSend.attack_roll = attack_roll
      var damage_roll = compute_damage(weapon, attack.attacker_id, attack_roll, target_character_number)
      toSend.damage_roll = damage_roll
      toSend.outcome = "full_crit"
    }
    socket.sendMessage(toSend);

  } else {
    alert("Далековато...")
  }
  stop_attack()
}

function compute_damage(weapon, character_number, attack_roll, target_number) {
  var damage = 0
  var character = character_detailed_info[character_number]

  if (character.special_type == "sniper") {
    if (attack_roll < 16) {
      for (let i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1])
      }
      if (weapon.type == 'melee') {
        damage = damage + strength_damage_map[parseInt(character.strength)]
      }
      damage = damage + character_state.damage_bonus[character_number]
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
            damage = damage*2
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*5
          break;
          default:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            if (weapon.type == 'melee') {
              damage = damage + strength_damage_map[parseInt(character.strength)]
            }
            damage = damage + character_state.damage_bonus[character_number]
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
          damage = damage*3
          break;
          default:
          for (let i = 0; i < weapon.damage[0]; i++) {
            damage = damage + roll_x(weapon.damage[1])
          }
          if (weapon.type == 'melee') {
            damage = damage + strength_damage_map[parseInt(character.strength)]
          }
          damage = damage + character_state.damage_bonus[character_number]
        }
      }
    }
  } else {
    if (attack_roll < 19) {
      for (let i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1])
      }
    } else {
      damage = weapon.damage[1] * weapon.damage[0]
    }
    if (weapon.type == 'melee') {
      damage = damage + strength_damage_map[parseInt(character.strength)]
    }
    damage = damage + character_state.damage_bonus[character_number]

    if (attack_roll == 20) {
      damage = damage * 2
    }
  }

  return damage
}


function stop_skill() {
  targeted_skill.in_process = 0
  var old_cell = document.getElementById("cell_" + targeted_skill.attacker_position);
  old_cell.src = character_detailed_info[targeted_skill.attacker_id].avatar;
}

function weak_spot(index, cell) {
  var target_character_number = game_state.board_state[index]
  var attacking_character = character_detailed_info[targeted_skill.attacker_id]

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = targeted_skill.skill_id
  toSend.room_number = my_room;
  toSend.attacker_id = targeted_skill.attacker_id
  toSend.target_id = target_character_number

  var int_check = roll_x(20) + parseInt(attacking_character.intelligence)
  if (int_check >= 15) {
    toSend.outcome = "success"
  } else {
    toSend.outcome = "fail"
  }

  socket.sendMessage(toSend);
}

function heal(index, cell) {
  var target_character_number = game_state.board_state[index]
  var healer_character = character_detailed_info[targeted_skill.attacker_id]
  var target_character = character_detailed_info[target_character_number]

  var target_hp = character_state.HP[target_character_number]
  var target_full_hp = HP_values[target_character.stamina]
  var ratio = parseFloat(target_hp)/parseFloat(target_full_hp)

  var heal_roll = roll_x(20) + parseInt(healer_character.intelligence)
  if (healer_character.special_type == "med") {
    heal_roll = heal_roll + parseInt(healer_character.intelligence)
  }
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = targeted_skill.skill_id
  toSend.room_number = my_room;
  toSend.healer_id = targeted_skill.attacker_id
  toSend.target_id = target_character_number
  toSend.heal_roll = heal_roll

  var threshold = 0
  var critical_threshold = 0

  if (ratio > 0.9) {
    threshold = 10
    if (heal_roll > threshold) {
      toSend.outcome = "success"
      toSend.new_hp = target_full_hp
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.75) {
    threshold = 15
    critical_threshold = 25
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = target_full_hp
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.95)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.5) {
    threshold = 20
    critical_threshold = 29
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.95)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.82)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.3) {
    threshold = 23
    critical_threshold = 32
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.82)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.62)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.15) {
    threshold = 26
    critical_threshold = 35
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.62)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.4)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else if (ratio > 0.05) {
    threshold = 30
    critical_threshold = 40
    if (heal_roll > threshold) {
      if (heal_roll > critical_threshold && healer_character.special_type == "med") {
        toSend.outcome = "critical success"
        toSend.new_hp = Math.floor(target_full_hp * 0.4)
      } else {
        toSend.outcome = "success"
        toSend.new_hp = Math.floor(target_full_hp * 0.22)
      }
    } else {
      toSend.outcome = "fail"
    }
  } else {
    toSend.outcome = "fail"
  }

  socket.sendMessage(toSend);
}

// increase attack roll by agility bonus (2*mod)
function cut_limbs(index, cell) {
  var weapon = weapon_detailed_info[character_state.current_weapon[targeted_skill.attacker_id]]
  var cut_range = 1

  if (isInRange(index, targeted_skill.attacker_position, cut_range)) {

    var target_character_number = game_state.board_state[index]
    var target_character_KD = parseInt(character_state.KD_points[target_character_number])
    var target_character = character_detailed_info[target_character_number]
    var attacking_character = character_detailed_info[targeted_skill.attacker_id]
    var attack_roll = roll_x(20)

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = targeted_skill.skill_id
    toSend.room_number = my_room;
    toSend.attacker_id = targeted_skill.attacker_id
    toSend.target_id = target_character_number

    if (attack_roll < 20) {// no crit
      var cumulative_attack_roll = attack_roll + 2*parseInt(attacking_character.agility)

      var attack_bonus = character_state.attack_bonus[targeted_skill.attacker_id]
      cumulative_attack_roll = cumulative_attack_roll + attack_bonus

      toSend.attack_roll = cumulative_attack_roll

      if (cumulative_attack_roll > target_character_KD) {// Есть пробитие
        if (character_state.can_evade[target_character_number] == 1) {
          var evade_roll = roll_x(20) + parseInt(target_character.agility)
          toSend.evade_roll = evade_roll
          if (evade_roll > cumulative_attack_roll) { //succesfully evaded
            toSend.outcome = "evaded"
          } else {
            var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number)
            var flat_damage = damage_roll - strength_damage_map[parseInt(character_detailed_info[targeted_skill.attacker_id].strength)] - character_state.damage_bonus[targeted_skill.attacker_id]
            var full_damage = weapon.damage[1] * weapon.damage[0]
            if (flat_damage > full_damage/2) {
              toSend.skill_outcome = "success"
            } else {
              toSend.skill_outcome = "fail"
            }
            toSend.damage_roll = damage_roll
            toSend.outcome = "damage_after_evasion"
          }
        } else {
          var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number)
          var flat_damage = damage_roll - strength_damage_map[parseInt(character_detailed_info[targeted_skill.attacker_id].strength)] - character_state.damage_bonus[targeted_skill.attacker_id]
          var full_damage = weapon.damage[1] * weapon.damage[0]
          if (flat_damage > full_damage/2) {
            toSend.skill_outcome = "success"
          } else {
            toSend.skill_outcome = "fail"
          }
          toSend.damage_roll = damage_roll
          toSend.outcome = "damage_without_evasion"
        }
      } else {
        toSend.outcome = "KD_block"
      }
    } else { // full crit
      toSend.attack_roll = attack_roll
      var damage_roll = compute_damage(weapon, targeted_skill.attacker_id, attack_roll, target_character_number)
      toSend.skill_outcome = "success"
      toSend.damage_roll = damage_roll
      toSend.outcome = "full_crit"
    }
    socket.sendMessage(toSend);

  } else {
    alert("Далековато...")
  }

}

function perform_skill(index, cell) {
  switch(targeted_skill.skill_id) {
    case 2: // Подрезать сухожилия
      cut_limbs(index, cell)
      stop_skill()
      break;
    case 3: // Слабое место
      weak_spot(index, cell)
      stop_skill()
      break;
    case 4: // Лечение
      heal(index, cell)
      stop_skill()
      break;

    default:
      alert("Unknown targeted skill")
  }
}

function use_skill(skill_index, character_number, position, cell) {
  skill_index = parseInt(skill_index)
  console.log(skill_index)
  switch(skill_index) {
    case 0: //Рывок
      if (character_state.bonus_action[character_number] > 0) {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index
        toSend.character_number = character_number
        socket.sendMessage(toSend);
      } else {
        alert("Не хватает действий!")
      }
      break;
    case 1: //Прилив Адреналина
      if (character_state.special_effects[character_number].hasOwnProperty("adrenaline")) {
        alert("Умение все еще на кулдауне")
      } else {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index
        toSend.character_number = character_number
        var extra_actions = roll_x(4)
        var minus_actions = roll_x(4)
        toSend.extra_actions = extra_actions
        toSend.minus_actions = minus_actions
        socket.sendMessage(toSend);
      }
      break;
    case 2: // Подрезать сухожилия
    if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
      field_chosen = 0
      attack.in_process = 0
      targeted_skill.in_process = 1
      targeted_skill.skill_id = skill_index
      targeted_skill.attacker_id = character_number
      targeted_skill.attacker_position = position
      cell.src = "./images/Chidori.webp";
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 3: // Слабое место
    if (character_state.bonus_action[character_number] > 0) {
      field_chosen = 0
      attack.in_process = 0
      targeted_skill.in_process = 1
      targeted_skill.skill_id = skill_index
      targeted_skill.attacker_id = character_number
      targeted_skill.attacker_position = position
      cell.src = "./images/Chidori.webp";
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 4: // Лечение
    if (character_state.bonus_action[character_number] > 0) {
      field_chosen = 0
      attack.in_process = 0
      targeted_skill.in_process = 1
      targeted_skill.skill_id = skill_index
      targeted_skill.attacker_id = character_number
      targeted_skill.attacker_position = position
      cell.src = "./images/Chidori.webp";
    } else {
      alert("Не хватает действий!")
    }
    break;

    default:
      alert("Не знаем это умение")
  }
}

function change_battle_mod() {
  if (battle_mod == 1) {
    var new_value = 0
  } else {
    var new_value = 1
  }

  var toSend = {};
  toSend.command = 'battle_mod';
  toSend.room_number = my_room;
  toSend.value = new_value
  socket.sendMessage(toSend);
}

// {board_state: [], HP_state: [], initiative_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: []};
function mirror_board() {
  var left_index;
  var right_index;
  var temp;
  var left_cell;
  var right_cell;
  for (let y = 0; y < game_state.size; y++) {
    for (let x = 0; x < game_state.size/2; x++) {

      left_index = y*game_state.size + x;
      right_index = y*game_state.size + parseInt(game_state.size) - x - 1;
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
socket.init(SERVER_ADDRESS);

socket.registerOpenHandler(() => {
  var toSend = {};
  toSend.command = 'player_info';
  toSend.room_number = my_room;
  toSend.from_name = my_name;
  toSend.role = my_role;
  if (my_role == 'gm') {
    toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
  }
  socket.sendMessage(toSend);
});

socket.registerMessageHandler((data) => {
  console.log(data);
  if (((data.to_name == my_name) || (data.to_name == 'all')) && (data.room_number == my_room)) {
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
      weapon_list = data.weapon_list
      weapon_detailed_info = data.weapon_detailed_info
      skill_list = data.skill_list

    } else if (data.command == 'construct_board_response') {
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
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
      character_state.can_evade[data.character_number] = 1;
      character_state.visibility[data.character_number] = 0;
      character_state.current_weapon[data.character_number] = character.inventory[0]
      character_state.attack_bonus[data.character_number] = 0
      character_state.damage_bonus[data.character_number] = 0
      character_state.special_effects[data.character_number] = {}


    } else if (data.command == 'add_obstacle_response') {
      var obstacle = data.obstacle_info;
      obstacle_detailed_info[data.obstacle_number] = obstacle;
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = obstacle.avatar;
      }
      game_state.board_state[data.cell_id] = data.obstacle_number * (-1);
    } else if (data.command == 'move_character_response') {
      var to_index = data.to_index;
      var from_index = data.from_index;
      game_state.board_state[to_index] = data.character_number;

      if (battle_mod == 1) {
        character_state.stamina[data.character_number] = character_state.stamina[data.character_number] - stamina_move_cost
        character_state.move_action[data.character_number] = character_state.move_action[data.character_number] - 1
        var character = character_detailed_info[data.character_number]
        if (character.special_type == "sniper") {
          var effects_object = character_state.special_effects[data.character_number]
          if (effects_object.hasOwnProperty("sniper_passive")) {
            var current_attack_bonus = effects_object.sniper_passive.attack_bonus
            var current_damage_bonus = effects_object.sniper_passive.damage_bonus
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - current_attack_bonus - 5
            character_state.damage_bonus[data.character_number] = character_state.damage_bonus[data.character_number] - current_damage_bonus
            character_state.special_effects[data.character_number].sniper_passive.attack_bonus = -5
            character_state.special_effects[data.character_number].sniper_passive.damage_bonus = 0
          } else {
            var sniper_passive_object = {}
            sniper_passive_object.attack_bonus = -5
            sniper_passive_object.damage_bonus = 0
            character_state.special_effects[data.character_number].sniper_passive = sniper_passive_object
            character_state.attack_bonus[data.character_number] = character_state.attack_bonus[data.character_number] - 5
          }
        }
      }

      if (!((my_role == 'player')&&(game_state.fog_state[to_index] == 1))) {
        var to_cell = document.getElementById('cell_' + to_index);
        to_cell.src = data.character_avatar;
      }

      game_state.board_state[from_index] = 0;
      if (!((my_role == 'player')&&(game_state.fog_state[from_index] == 1))) {
        var old_cell = document.getElementById("cell_" + from_index);
        old_cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'delete_character_response') {
      game_state.board_state[data.index] = 0;
      if (!((my_role == 'player')&&(game_state.fog_state[data.index] == 1))) {
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
      var message = data.character_name + " бросает " + data.roll
      pushToList(message)
    } else if (data.command == 'skill_response') {
      switch(data.skill_index) {
        case 0:
            character = character_detailed_info[data.character_number]
            character_state.bonus_action[data.character_number] = character_state.bonus_action[data.character_number] - 1
            character_state.move_action[data.character_number] = character_state.move_action[data.character_number] + 1
            var message = character.name + " совершает рывок"
            pushToList(message)
            break;
          case 1:
            character = character_detailed_info[data.character_number]
            var extra_actions = data.extra_actions
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[data.character_number] = character_state.move_action[data.character_number] + 1
              } else {
                character_state.main_action[data.character_number] = character_state.main_action[data.character_number] + 1
              }
              extra_actions = extra_actions - 1
            }
            var adrenaline_object = {}
            adrenaline_object.cooldown = 3
            adrenaline_object.minus_actions = data.minus_actions
            character_state.special_effects[data.character_number].adrenaline = adrenaline_object
            var message = character.name + " использует прилив адреналина и получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход."
            pushToList(message)
            break;
          case 2:
            var attacker = character_detailed_info[data.attacker_id]
            var target = character_detailed_info[data.target_id]
            if (battle_mod == 1) {
              character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_cut_limb_cost
              character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1
              character_state.bonus_action[data.attacker_id] = character_state.bonus_action[data.attacker_id] - 1
            }
            switch (data.outcome) {
              case "KD_block":
                var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
                pushToList(message)
                break;
              case "evaded":
                var message = attacker.name + " пытается подрезать " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
                pushToList(message)
                if (target.special_type != 'rogue') {
                  character_state.can_evade[data.target_id] = 0
                }
                break;
              case "damage_without_evasion":
                if (data.skill_outcome == "success") {
                  var limb_cut_object = {}
                  limb_cut_object.cooldown = cooldown_cut_limb
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
                break;
              case "damage_after_evasion":
                if (data.skill_outcome == "success") {
                  var limb_cut_object = {}
                  limb_cut_object.cooldown = cooldown_cut_limb
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
                character_state.can_evade[data.target_id] = 0
                break;
            case "full_crit":
              var limb_cut_object = {}
              limb_cut_object.cooldown = cooldown_cut_limb + 1
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object
              character_state.move_action[data.target_id] = -10
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона."
              pushToList(message)
              character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
              break;
            default:
              console.log("fucked up resolving damage")
              break;
          }
            break;
        case 3:
          var attacker = character_detailed_info[data.attacker_id]
          character_state.bonus_action[data.attacker_id] = character_state.bonus_action[data.attacker_id] - 1
          character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_weakspot_cost
          var target = character_detailed_info[data.target_id]
          if (data.outcome = "success") {
            var weakspot_object = {}
            weakspot_object.hunter_id = data.attacker_id
            character_state.special_effects[data.target_id].weakspot = weakspot_object
            var message = attacker.name + " успешно обнаружил слабое место " + target.name
          } else {
            var message = attacker.name + " не удалось обнаружить слабое место " + target.name
          }
          pushToList(message)
          break;

        case 4:
        var healer = character_detailed_info[data.healer_id]
        var target = character_detailed_info[data.target_id]
        character_state.bonus_action[data.healer_id] = character_state.bonus_action[data.healer_id] - 1
        character_state.stamina[data.healer_id] = character_state.stamina[data.healer_id] - 1
          switch (data.outcome) {
            case "fail":
              var message = "У " + healer.name + " не получилось вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              break;
            case "success":
              var message = "У " + healer.name + " получилось успешно вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              character_state.HP[data.target_id] = data.new_hp
              break;
            case "critical success":
              var message = "У " + healer.name + " получилось критически (2 степени) вылечить " + target.name + " (" + data.heal_roll + ")"
              pushToList(message)
              character_state.HP[data.target_id] = data.new_hp
              break;
            default:
              console.log("Ошибка при разборе отхила")
          }
          break;
        default:
          alert("Received unknown skill command")
      }
    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!"
      pushToList(message)
      for (let i = 1; i < character_state.can_evade.length; i++) {
        character = character_detailed_info[i]
        if (character !== undefined) {
          character_state.can_evade[i] = 1
          character_state.move_action[i] = move_action_map[character.agility];
          character_state.bonus_action[i] = bonus_action_map[character.agility];
          character_state.main_action[i] = main_action_map[character.agility];
          if (character_state.special_effects[i].hasOwnProperty("adrenaline")) {
            if (character_state.special_effects[i].adrenaline.cooldown == 3) {
              var minus_actions = character_state.special_effects[i].adrenaline.minus_actions
              while (minus_actions > 0) {
                if (minus_actions % 2 == 0) {
                  character_state.move_action[i] = character_state.move_action[i] - 1
                } else {
                  character_state.main_action[i] = character_state.main_action[i] - 1
                }
                minus_actions = minus_actions - 1
              }
            }
            character_state.special_effects[i].adrenaline.cooldown = character_state.special_effects[i].adrenaline.cooldown - 1
            if (character_state.special_effects[i].adrenaline.cooldown == 0) {
              delete character_state.special_effects[i].adrenaline
              var message = "Умение Прилив Адреналина у " + character.name + " снова доступно."
              pushToList(message)
            }
          }
          if (character_state.special_effects[i].hasOwnProperty("cut_limb")) {
            character_state.move_action[i] = -10
            character_state.special_effects[i].cut_limb.cooldown = character_state.special_effects[i].cut_limb.cooldown - 1
            if (character_state.special_effects[i].cut_limb.cooldown == 0) {
              delete character_state.special_effects[i].cut_limb
              var message = "Сухожилия " + character.name + " восстановятся на следующем ходу."
              pushToList(message)
            }
          }
          if (character.special_type == 'sniper') {
            var effects_object = character_state.special_effects[i]
            if (effects_object.hasOwnProperty("sniper_passive")) {
              var current_attack_bonus = effects_object.sniper_passive.attack_bonus
              var current_damage_bonus = effects_object.sniper_passive.damage_bonus
              if (current_attack_bonus == -5) {
                var new_attack_bonus = 0
                var new_damage_bonus = 0
              } else {
                var new_attack_bonus = Math.min(current_attack_bonus + 1, 4)
                var new_damage_bonus = Math.min(current_damage_bonus + 2, 8)
              }
              character_state.attack_bonus[i] = character_state.attack_bonus[i] - current_attack_bonus + new_attack_bonus
              character_state.damage_bonus[i] = character_state.damage_bonus[i] - current_damage_bonus + new_damage_bonus
              character_state.special_effects[i].sniper_passive.attack_bonus = new_attack_bonus
              character_state.special_effects[i].sniper_passive.damage_bonus = new_damage_bonus
            } else {
              var sniper_passive_object = {}
              sniper_passive_object.attack_bonus = 0
              sniper_passive_object.damage_bonus = 0
              character_state.special_effects[i].sniper_passive = sniper_passive_object
            }
          }
        }
      }
    } else if (data.command == 'battle_mod_response') {
      battle_mod = data.value
      if (battle_mod == 0) {
        var message = "Бой окончен! Наступил мир во всем мире"
      } else {
        var message = "Начало боя! Люди умирают, если их убить"
      }
      pushToList(message)
    } else if (data.command == 'resolve_attack_response') {
      var attacker = character_detailed_info[data.attacker_id]
      var target = character_detailed_info[data.target_id]
      if (battle_mod == 1) {
        character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_attack_cost
        character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1
      }
      switch (data.outcome) {
        case "KD_block":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
          pushToList(message)
          break;
        case "evaded":
          var message = attacker.name + " атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
          pushToList(message)
          if (target.special_type != 'rogue') {
            character_state.can_evade[data.target_id] = 0
          }
          break;
        case "damage_without_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
          pushToList(message)
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
          break;
        case "damage_after_evasion":
          var message = attacker.name + " успешно атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
          pushToList(message)
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
          character_state.can_evade[data.target_id] = 0
          break;
        case "full_crit":
          var message = attacker.name + " критически атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона."
          pushToList(message)
          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage_roll
          break;
        default:
          console.log("fucked up resolving damage")
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
for (let i = 1; i < MAX_ZONES; i++) {
  var current_option = $("<option>");
  current_option.text('Зона ' + i);
  current_option.val(i);
  zone_number_select.append(current_option);
}

var search_modificator = $(SEARCH_MODIFICATOR_SELECTOR);
search_modificator.hide();

var notifications_list = $(NOTIFICATIONS_LIST_SELECTOR);
for (let i = 0; i < CHAT_CASH; i++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + i);
  current_element.attr('class', 'notifications_list_element');
  notifications_list.append(current_element);
}

var board_size_input = $(BOARD_SIZE_INPUT_SELECTOR);
board_size_input.hide();

var save_name_input = $(SAVE_NAME_INPUT_SELECTOR);
save_name_input.hide();

var notifications_container = document.getElementById("notifications-container");
notifications_container.style.display = 'none';

setInterval(reconnect, 30*1000)
