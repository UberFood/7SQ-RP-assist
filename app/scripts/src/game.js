import socket from './ws-client';

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
var item_list = [];
var item_detailed_info;

var initiative_order_array = [];

var TINY_EFFECT_CLASS = 'is-tiny';

var EMPTY_CELL_PIC = "./images/square.jpg";
var ZONE_ENDPOINT_PIC = "./images/red_cross.jpg"
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

var stamina_weakspot_cost = 1
var stamina_move_cost = 0
var stamina_attack_cost = 1
var punch_rainfall_stamina_cost = 2 // per punch
var stamina_cut_limb_cost = 4
var shield_up_stamina_cost = 2 // per move I think
var lottery_shot_stamina_cost = 1
var lucky_shot_stamina_cost = 1
var action_splash_stamina_cost = 2
var adrenaline_stamina_cost = 3
var acid_bomb_stamina_cost = 3
var curved_bullets_stamina_cost = 2

var cut_limb_cooldown = 1

var rest_stamina_gain = 5

var cut_limb_duration = 1
var cooldown_big_bro = 1 // duration

var shield_up_KD = 3

var adrenaline_move_increase = 4
var charge_move_increase = 4

var sniper_passive_penalty = -5;

var gas_bomb_base_threshold = 10
var gas_bomb_move_reduction = 2
var gas_bomb_stamina_cost = 3
var gas_bomb_obstacle = 15
var gas_bomb_skill_cooldown = 5

var light_sound_bomb_radius = 4
var light_sound_bomb_threshold = 15
var light_sound_bomb_skill_cooldown = 5

var weak_spot_threshold = 15;
const weak_spot_range = 25;
const weak_spot_cover_impossible_threshold = 10;

var shocked_cooldown = 0

var pich_pich_cooldown = 4
var pich_pich_move_increase = 4

var force_field_radius = 1.6
var force_field_stamina_cost = 5
var force_field_cooldown = 10
var force_field_obstacle = 24

var action_splash_cooldown = 4

var invisibility_detection_radius = 2;
var invisibility_detection_threshold = 10;

var big_bro_range = 2
var heal_range = 1
var throw_base_range = 2
var light_sound_bomb_range = 5
var force_field_range = 1
var adrenaline_range = 1
var poisonous_adrenaline_range = 1

var poisonous_adrenaline_duration = 2
var poisonous_adrenaline_cooldown = 5
var poisonous_adrenaline_flat_HP = 5
var poisonous_adrenaline_flat_stamina = 5
var poisonous_adrenaline_percent_HP = 0.05
var poisonous_adrenaline_percent_stamina = 0.05

var adrenaline_cooldown = 4

var acid_bomb_duration = 2 // 2+1 really
var acid_bomb_cooldown = 5
var acid_bomb_radius = 1.6

var mines_0_distance_damage = 20
var mines_1_distance_damage = 15
var mines_1p5_distance_damage = 10
var landmine_detection_radius = 4;
var landmine_diffusion_radius = 3;
var landmine_diffuse_threshold = 10

var tobacco_strike_hp_percentage = 0.1
var tobacco_strike_bonus = 4
var tobacco_strike_cooldown = 1

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

const jump_cover_impossible_threshold = 10;
const jump_base_distance = 1;

const belvet_jump_base_distance = 2;
const belvet_jump_weapon_id = 30;
const belvet_jump_cooldown = 2;

const carry_range = 1;
const carry_distance_modifier = 2;
const carry_bonus_actions_cost = 1;

// This is a constant, will be moved to database later
const HP_values = [15, 30, 40, 55, 75, 100, 130, 165, 205, 250, 300, 355, 415, 480, 550, 625, 705];
const stamina_values = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300];
const strength_damage_map = [-2, 0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 81, 95, 110, 126]
const move_action_map = [1, 3, 4, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
const bonus_action_map= [0, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5]
const main_action_map = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5]

var effect_list = ["Увеличить силу", "Увеличить телосложение", "Увеличить ловкость", "Увеличить интеллект", "Увеличить КД", "Уменьшить силу",
"Уменьшить телосложение", "Уменьшить ловкость", "Уменьшить интеллект", "Уменьшить КД"];
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


var CHARACTER_STATE_CONSTANT = {HP: [], main_action: [], bonus_action: [], move_action: [], stamina: [], initiative: [], can_evade: [], has_moved: [],
  KD_points: [], current_weapon: [], visibility: [], invisibility: [], attack_bonus: [], damage_bonus: [], universal_bonus: [], bonus_KD: [],
  special_effects: [], ranged_advantage: [], melee_advantage: [], defensive_advantage: [], position: [], evade_bonus: [], melee_resist: [], bullet_resist: []};
let game_state = {board_state: [], fog_state: [], zone_state: [], size: 0, search_modificator_state: [], terrain_effects: [], battle_mod: 0, obstacle_extra_info: [],
  landmines: {positions: [], knowers: []}};
let character_state = CHARACTER_STATE_CONSTANT;

let gm_control_mod = 0; // normal mode

// in_process: 0 = nothing, 1 = move, 2 = attack, 3 = skill
let character_chosen = {in_process: 0, char_id: 0, char_position: 0, weapon_id: 0, skill_id: 0, cell: 0};
let dragged = null;

let last_obstacle = 1;
let zone_endpoint = {index: -1, cell: 0}

var gunshot_audio = new Audio('sounds/gunshot.mp3');
var sword_audio = new Audio('sounds/sword.wav');
var explosion_audio = new Audio('sounds/explosion.mp3');
var suriken_audio = new Audio('sounds/suriken.mp3');

gunshot_audio.volume = 0.2
sword_audio.volume = 0.2
suriken_audio.volume = 0.2
explosion_audio.volume = 0.2

function reconnect() {
  if (!socket.isReady()) {
    socket.init(SERVER_ADDRESS);
    socket.registerMessageHandlerDefault();
    console.log('Hopefully reconnected (pray)');
  } else {
    console.log('Was online anyway');
    var toSend = {};
    toSend.command = 'ignore_me';
    socket.sendMessage(toSend);
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

  for (let i = 0; i < game_state.size * game_state.size; i++) {
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
  socket.sendMessage(toSend);
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
  socket.sendMessage(toSend);
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
  socket.sendMessage(toSend);
}

function construct_board(new_game_state) {
  game_state = new_game_state
  if (!game_state.hasOwnProperty("obstacle_extra_info")) {
    game_state.obstacle_extra_info = [];
    for (let i = 0; i < game_state.size*game_state.size; i++) {
      game_state.obstacle_extra_info[i] = {};
    }
  }
  clear_containers()

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
          shift_onclick(index, cell)
        } else if (event.ctrlKey) {
          ctrl_onclick(index)
        } else if (event.altKey) {
          alt_onclick(index)
        } else {
          no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, index)
        }

      };

      button.ondblclick = function(event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;
        board_double_click(index, cell);
      }
      button.draggable = true;
      button.ondragover = function(event) {
        event.preventDefault();
      }
      button.ondragstart = function(event) {
        dragged = event.target;
        var cell = dragged;
        var index = cell.row * game_state.size + cell.column;
        var character_number = game_state.board_state[index];
        if (character_number > 0 && (my_role == "gm" || character_state.visibility[character_number] == 1) && (character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name) && (my_role == "gm" || game_state.fog_state[index] == 0)) {
          choose_character_to_move(index, cell, false)
        }
      }
      button.ondrop = function(event) {
        var cell = event.target;
        var index = cell.row * game_state.size + cell.column;
        if (character_chosen.in_process == 1 && game_state.board_state[index] == 0 && (my_role == "gm" || game_state.fog_state[index] == 0)) {
          move_character(index, cell)
        } else {
          undo_selection();
        }
      }
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
        zone_endpoint.index = index
        zone_endpoint.cell = cell
        cell.src = ZONE_ENDPOINT_PIC
      } else {
        endpoint_assign_zone(index, zone_endpoint.index)
        zone_endpoint.cell.src = EMPTY_CELL_PIC
        zone_endpoint.index = -1
      }
    } else {
      var toSend = {};
      toSend.command = 'add_obstacle';
      toSend.cell_id = index;
      toSend.obstacle_number = last_obstacle;
      toSend.obstacle_name = obstacle_list[last_obstacle - 1];
      toSend.room_number = my_room;
      socket.sendMessage(toSend);
    }
  }
}

function ctrl_onclick(index) {
  if (my_role == 'gm') {
    var fog_value = game_state.fog_state[index]
    var mod = 1 - fog_value
    var zone = game_state.zone_state[index]
    fogParseZone(mod, zone)
  }
}

function alt_onclick(index) {
  if (my_role == 'gm') {
    delete_object_command(index);
  }
}

function board_double_click(index, cell) {
  var entity_number = game_state.board_state[index];
  if (entity_number < 0) { //препятствие
    if (obstacle_detailed_info[Math.abs(entity_number)].hasOwnProperty("item_container")) { // тогда можем положить туда предметы
      console.log("Item container")
    }
  }
}

function standard_cell_onClick(index, cell, role) {
	if (game_state.board_state[index] == 0) { // empty cell clicked

    switch(character_chosen.in_process) {
      case 0: // nothing
        if (role == 'gm') {
          add_object(index);
        }
        break;
      case 1: // move
        move_character(index, cell);
        break;
      case 2: //attack
        stop_attack()
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click empty")
    }

	} else if (game_state.board_state[index] > 0) { // character clicked
    switch(character_chosen.in_process) {
      case 0: // nothing
        select_character(index, cell);
        break;
      case 1: // move
        undo_selection();
        break;
      case 2: //attack
        perform_attack(index, cell)
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click character")
    }

	} else { // obstacle clicked

    switch(character_chosen.in_process) {
      case 0: // nothing
        select_obstacle(index, cell);
        break;
      case 1: // move
        undo_selection();
        break;
      case 2: //attack
        attack_obstacle(index, cell);
        break;
      case 3: //skill
        perform_skill(index, cell)
        break;
      default:
        console.log("Error resolving on_click obstacle")
    }

	}
}

// Zone/fog related staff

function endpoint_assign_zone(endpoint1, endpoint2) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();
  var size = game_state.size

  var index_list = []

  var coord1 = index_to_coordinates(endpoint1, size)
  var coord2 = index_to_coordinates(endpoint2, size)

  var top_left = top_left_coord(coord1, coord2)
  var bottom_right = bottom_right_coord(coord1, coord2)

  for (let i = top_left.x; i <= bottom_right.x; i++) {
    for (let j = top_left.y; j <= bottom_right.y; j++) {
      var coord = {}
      coord.x = i
      coord.y = j
      var index = coord_to_index(coord, size)

      index_list.push(index)
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
  socket.sendMessage(toSend);
}

function assignZone(index) {
  var zone_number = zone_number_select.val();
  var modificator = search_modificator.val();

  var zone_text = document.getElementById('zone_text_' + index);
  zone_text.innerHTML = zone_number + '(' + modificator + ')';

  var index_list = []
  index_list.push(index)

  var toSend = {};
  toSend.command = 'assign_zone';
  toSend.zone_number = zone_number;
  toSend.index_list = index_list;
  toSend.modificator = modificator;
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
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
  for (let i = 0; i < game_state.size * game_state.size; i++) {
    if (game_state.zone_state[i] == current_zone) {
      index_list.push(i);
    }
  }
  toSend.index_list = index_list;
  socket.sendMessage(toSend);
}

// Helper coordinate related functions

function top_left_coord(coord1, coord2) {
  var toRet = {}
  toRet.x = Math.min(coord1.x, coord2.x)
  toRet.y = Math.min(coord1.y, coord2.y)
  return toRet
}

function bottom_right_coord(coord1, coord2) {
  var toRet = {}
  toRet.x = Math.max(coord1.x, coord2.x)
  toRet.y = Math.max(coord1.y, coord2.y)
  return toRet
}

function coord_to_index(coord, size) {
  var index = coord.x * size + coord.y
  return index
}

function index_to_coordinates(index, size) {
  var toRet = {}
  toRet.x = Math.floor(index/size)
  toRet.y = index % size
  return toRet
}

function findDistance(index1, index2) {
  var x1 = Math.floor(index1/game_state.size)
  var y1 = index1 % game_state.size

  var x2 = Math.floor(index2/game_state.size)
  var y2 = index2 % game_state.size

  var distance_squared = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  var distance = Math.sqrt(distance_squared)
  return parseFloat(distance)
}

function isInRange(index1, index2, range) {
  var x1 = Math.floor(index1/game_state.size)
  var y1 = index1 % game_state.size

  var x2 = Math.floor(index2/game_state.size)
  var y2 = index2 % game_state.size

  var distance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
  return distance <= range*range
}

function index_in_radius(index, range) {
  var size = game_state.size
  var x = Math.floor(index/size)
  var y = index % size
  var candidate_index_list = []

  //console.log("x: " + x + " y: " + y + " index: " + index)

  for (let i = Math.floor(-1 * range); i <= Math.ceil(range); i++) {
    for (let j = Math.floor(-1 * range); j <= Math.ceil(range); j++) {
      var cand_x = x + i
      var cand_y = y + j
      //console.log("cand_x: " + cand_x + " cand_y: " + cand_y)
      if (cand_x >=0 && cand_x < size && cand_y >=0 && cand_y < size) {
        var cand_index = cand_x*size + cand_y
        //console.log("cand_index: " + cand_index)
        if (isInRange(index, cand_index, range)) {
          //console.log("cand_index: " + cand_index + "was considered in range")
          candidate_index_list.push(cand_index)
        }
      }
    }
  }
  return candidate_index_list
}

function line_from_endpoints(point1, point2) {
  var line = {}
  line.a = -1*(point1.y - point2.y)
  line.b = point1.x - point2.x
  line.c = -1*(line.a * point2.x + line.b * point2.y)
  return line
}

function distance_to_line(endpoint1, endpoint2, size, testpoint) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size)
  var endpoint2_coord = index_to_coordinates(endpoint2, size)
  var testpoint_coord = index_to_coordinates(testpoint, size)

  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord)
  console.log(line)
  console.log(testpoint_coord)

  var distance = Math.abs(line.a*testpoint_coord.x + line.b*testpoint_coord.y + line.c)/Math.sqrt(line.a*line.a + line.b*line.b)

  console.log(distance)
  return distance
}

function cells_on_line(endpoint1, endpoint2, size) {
  var endpoint1_coord = index_to_coordinates(endpoint1, size)
  var endpoint2_coord = index_to_coordinates(endpoint2, size)
  var line = line_from_endpoints(endpoint1_coord, endpoint2_coord)

  var scale = Math.max(Math.abs(line.a), Math.abs(line.b))
  // need to be reversed! remember line.a = delta y
  var x_step = line.b/scale
  var y_step = -1*line.a/scale
  var current_point = endpoint2_coord

  var safety_iter = 0
  var candidate_cells = []
  while (Math.abs(current_point.x - endpoint1_coord.x) > 0.5 || Math.abs(current_point.y - endpoint1_coord.y) > 0.5) {
    current_point.x += x_step
    current_point.y += y_step

    var ceil = {}
    ceil.x = Math.ceil(current_point.x)
    ceil.y = Math.ceil(current_point.y)
    var ceil_index = coord_to_index(ceil, size)

    var floor = {}
    floor.x = Math.floor(current_point.x)
    floor.y = Math.floor(current_point.y)
    var floor_index = coord_to_index(floor, size)


    candidate_cells.push(ceil_index)
    if (ceil_index != floor_index) {
      candidate_cells.push(floor_index)
    }

    safety_iter = safety_iter + 1
    if (safety_iter > 50) {
      break;
    }
  }
  return candidate_cells
}

// animations, container maintance

function clear_containers() {
  character_info_container.html("")
  weapon_info_container.html("")
}

function tiny_animate_containers() {
  tiny_animation(character_info_container);
  tiny_animation(weapon_info_container);
}

function tiny_animation(container) {
  container.addClass(TINY_EFFECT_CLASS);
  setTimeout(function() {
    container.removeClass(TINY_EFFECT_CLASS);
  }, 50);
}

// adding objects, characters

function add_object(board_index) {
  clear_containers()

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
  character_info_container.append(button_container);

  tiny_animate_containers()
}

function add_obstacle_command(index, obstacle_number) {
  var toSend = {};
  toSend.command = 'add_obstacle';
  toSend.cell_id = index;
  toSend.obstacle_number = obstacle_number + 1;
  toSend.obstacle_name = obstacle_list[obstacle_number];
  toSend.room_number = my_room;
  socket.sendMessage(toSend);
}

function add_obstacle(board_index) {
  clear_containers()

  var select = document.createElement("select");
  select.id = "obstacle_chosen";
  select.className = "object_select"

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

    add_obstacle_command(button.board_index, obstacle_number)

    clear_containers()
  }

  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers()

}

function add_character(board_index) {
  clear_containers()

  var select = document.createElement("select");
  select.id = "character_chosen";
  select.className = "object_select"

  var players_optgroup = document.createElement("optgroup");
  players_optgroup.id = "players_optgroup"
  players_optgroup.className = "character_optgroup"
  players_optgroup.label = "Игроки"

  var penguin_optgroup = document.createElement("optgroup");
  penguin_optgroup.id = "penguin_optgroup"
  penguin_optgroup.className = "character_optgroup"
  penguin_optgroup.label = "Пингвины"

  var shield_optgroup = document.createElement("optgroup");
  shield_optgroup.id = "shield_optgroup"
  shield_optgroup.className = "character_optgroup"
  shield_optgroup.label = "Сквадовцы"

  var sword_optgroup = document.createElement("optgroup");
  sword_optgroup.id = "sword_optgroup"
  sword_optgroup.className = "character_optgroup"
  sword_optgroup.label = "Мечи"

  var mutant_optgroup = document.createElement("optgroup");
  mutant_optgroup.id = "mutant_optgroup"
  mutant_optgroup.className = "character_optgroup"
  mutant_optgroup.label = "Мутанты"

  var anima_optgroup = document.createElement("optgroup");
  anima_optgroup.id = "anima_optgroup"
  anima_optgroup.className = "character_optgroup"
  anima_optgroup.label = "Звери"

  var vanshot1_optgroup = document.createElement("optgroup");
  vanshot1_optgroup.id = "vanshot1_optgroup"
  vanshot1_optgroup.className = "character_optgroup"
  vanshot1_optgroup.label = "Ваншот 1"

  var other_optgroup = document.createElement("optgroup");
  other_optgroup.id = "other_optgroup"
  other_optgroup.className = "character_optgroup"
  other_optgroup.label = "Остальные"

  for (let i = 0; i < character_list.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = character_list[i];
    current_option.value = i;
    var character_group = group_list[i]
    switch(character_group) {
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
      case "vanshot1":
        vanshot1_optgroup.appendChild(current_option);
        break;
      default:
        other_optgroup.appendChild(current_option);

    }

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

    clear_containers(0)
  }

  select.append(players_optgroup);
  select.append(shield_optgroup);
  select.append(vanshot1_optgroup);
  select.append(sword_optgroup);
  select.append(mutant_optgroup);
  select.append(anima_optgroup);
  select.append(penguin_optgroup);
  select.append(other_optgroup);
  character_info_container.append(select);
  character_info_container.append(button);
  tiny_animate_containers()

}

function obstacle_number_to_board_number(obstacle_number) {
  return -1*(obstacle_number + 1);
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
  if ((game_state.fog_state[cell_id] != 1)||(my_role == 'gm')) {
    var char_id = game_state.board_state[cell_id]
    picture_name = get_object_picture(char_id);
    if (char_id > 0 && character_state.invisibility[char_id] != "all" && character_state.invisibility[char_id] != my_name) {
      picture_name = get_object_picture(0);
    }

  }
  return picture_name;
}

function displayFog() {
	clear_containers()

	var info = document.createElement("p");
  info.innerHTML = 'Мы не знаем, что это такое. Если бы мы знали что это такое, но мы не знаем.';

	var fog_picture = document.createElement("IMG");
  fog_picture.src = QUESTION_IMAGE;
  fog_picture.style.width = '250px';
  fog_picture.style.height = '250px';

	character_info_container.append(info);
	character_info_container.append(fog_picture);

tiny_animate_containers()
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
    index_in_base = index_in_board_state * (-1);
    var obstacle = obstacle_detailed_info[index_in_base];
    image = obstacle.avatar;
  }

  return image;
}

// Move related functions

function move_character(to_index, to_cell) {

  character_chosen.in_process = 0; // end the motion
  var chosen_character_index = character_chosen.char_id;
  var chosen_index = character_state.position[chosen_character_index];

  var distance = findDistance(to_index, chosen_index)
  var max_distance = character_state.move_action[chosen_character_index]

  var true_distance = distance;
  if (character_state.special_effects[chosen_character_index].hasOwnProperty("carry_user")) {
    distance *= character_state.special_effects[chosen_character_index].carry_user.carry_distance_modifier;
  }

  if (distance <= max_distance) {
    if (!(game_state.battle_mod == 1 && true_distance > 1.6)) {
      var toSend = constructMoveSendObject(chosen_index, to_index, chosen_character_index, distance)

      clear_containers();
      socket.sendMessage(toSend);
    } else {
      alert("В бою нужно двигаться поступательно (1-1.5 клетки)")
      undo_selection()
    }
  } else {
    alert("Полегче, мсье Болт")
    undo_selection()
  }

}

function constructMoveSendObject(chosen_index, to_index, chosen_character_index, distance) {
  var toSend = setup_move_send_object(chosen_index, to_index, chosen_character_index, distance);

  var immediate_nbh = index_in_radius(to_index, 1.6);
  var extended_invisibility_nbh = index_in_radius(to_index, invisibility_detection_radius);

  toSend = updateMoveForceFieldStatus(chosen_character_index, to_index, toSend);
  toSend = updateMoveOwnInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_invisibility_nbh);
  toSend = updateMoveOthersInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_invisibility_nbh);
  toSend = updateMoveLandminesExploded(chosen_character_index, to_index, toSend, immediate_nbh);
  toSend = updateCarryUserStatus(chosen_character_index, toSend);
  toSend = updateMoveCarryTargetInterrupt(chosen_character_index, toSend);
  return toSend;
}

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

function updateCarryUserStatus(chosen_character_index, toSend) {
  if (character_state.special_effects[chosen_character_index].hasOwnProperty("carry_user")) {
    toSend.carry_in_progress = true;
    toSend.carry_target_index = character_state.special_effects[chosen_character_index].carry_user.carry_target_index;
  }
  return toSend;
}

function updateMoveForceFieldStatus(chosen_character_index, to_index, toSend) {
  if (character_state.special_effects[chosen_character_index].hasOwnProperty("force_field_target")) {
    var shield_index = character_state.special_effects[chosen_character_index].force_field_target.shield_index
    if(!game_state.terrain_effects[shield_index].cells_protected.includes(to_index)) {// покинул зону защиты
      toSend.left_shield = 1
      toSend.shield_index = shield_index
    }
  }
  return toSend;
}

function updateMoveOwnInvisibility(chosen_character_index, to_index, toSend, immediate_nbh, extended_nbh) {
  if (character_state.invisibility[chosen_character_index] != "all") { //user is invisible
    for (let i = 0; i < extended_nbh.length; i++) {
        var current_cell = extended_nbh[i];
        var object_number = game_state.board_state[current_cell];
        if (object_number > 0 && object_number != chosen_character_index) { // there are characters there
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
  for (let i = 0; i < extended_nbh.length; i++) {
      var current_cell = extended_nbh[i];
      var object_number = game_state.board_state[current_cell];
      if (object_number > 0 && object_number != chosen_character_index) {// there are characters there
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
  var character = character_detailed_info[chosen_character_index];
  if (!character.hasOwnProperty("landmine_immune")) {
    for (let i = 0; i < immediate_nbh.length; i++) {
        var current_cell = immediate_nbh[i];
        if (game_state.landmines.positions.includes(current_cell)) {
          toSend.mines_exploded.push(current_cell)
          toSend.mines_damage = toSend.mines_damage + roll_x(mines_1_distance_damage);
        }
    }
  }
  return toSend;
}

function updateMoveCharacterChosenInteraction(to_index) {
  character_chosen.char_position = to_index
  var to_cell = document.getElementById('cell_' + to_index);
  character_chosen.cell = to_cell
}

function updateMoveCarryTargetInterrupt(chosen_character_index, toSend) {
  if (character_state.special_effects[chosen_character_index].hasOwnProperty("carry_target")) {
    toSend.carry_interrupt = true;
    toSend.carry_user_index = character_state.special_effects[chosen_character_index].carry_target.carry_user_index;
    toSend.carry_target_index = chosen_character_index;
  }
  return toSend;
}

function receiveMoveOverall(data, action) {
  var to_index = data.to_index;
  var from_index = data.from_index;

  if (game_state.board_state[to_index] == 0 && game_state.board_state[from_index] == data.character_number) {
    var character = character_detailed_info[data.character_number];

    receiveMoveBasicState(to_index, from_index, data.character_number);
    receiveMoveInvisibilityReveal(data.invisibility_ended_id);
    receiveMoveForceFieldInteraction(data.left_shield, data.character_number, data.shield_index);
    receiveMoveLandmineExplosions(data.mines_exploded, data.mines_damage, data.character_number);
    receiveMoveImageState(to_index, from_index, data.character_number);
    if (data.hasOwnProperty("carry_in_progress")) {
      receiveMoveCarryAction(data.carry_target_index, data.from_index);
    }
    if (data.hasOwnProperty("carry_interrupt")) {
      carry_interruption(data.carry_user_index, data.carry_target_index);
    }

    if (game_state.battle_mod == 1) {
      switch(action) {
        case "move":
          receiveMoveSubstractActions(data.character_number, data.distance);
          break;

        case "jump":
          receiveJumpSubstractActions(data.character_number);
          setCooldown(data.character_number, 'jump_user', 0);
          break;

        case "belvet_jump":
          break;

        default:
          console.log("Unknown movement type");
      }
      if (character.special_type == "sniper") {
        receiveMoveSniperPassive(data.character_number);
      }
    }
  }
}

function receiveMoveBasicState(to_index, from_index, character_number) {
  game_state.board_state[to_index] = character_number;
  game_state.board_state[from_index] = 0;
  character_state.position[character_number] = to_index;
  character_state.has_moved[character_number] = 1;
}

function receiveMoveImageState(to_index, from_index, character_number) {
  if (!(((my_role == 'player')&&(game_state.fog_state[to_index] == 1)) || (character_state.invisibility[character_number] != "all" && character_state.invisibility[character_number] != my_name))) {
    var to_cell = document.getElementById('cell_' + to_index);
    to_cell.src = get_object_picture(character_number);
  }

  if (!((my_role == 'player')&&(game_state.fog_state[from_index] == 1))) {
    var old_cell = document.getElementById("cell_" + from_index);
    old_cell.src = EMPTY_CELL_PIC;
  }
}

function receiveMoveInvisibilityReveal(invisibility_ended_id) {
  for (let i = 0; i < invisibility_ended_id.length; i++) {
    var id = invisibility_ended_id[i];
    character_state.invisibility[id] = "all";

    var position = character_state.position[id];
    var to_cell = document.getElementById('cell_' + position);
    var avatar = get_object_picture(id);
    to_cell.src = avatar;
  }
}

function receiveMoveForceFieldInteraction(left_shield, character_number, shield_index) {
  // remove shielded property from character and remove character from shielded list
    if (left_shield == 1) {
      delete character_state.special_effects[character_number].force_field_target;
      var index = game_state.terrain_effects[shield_index].character_list.indexOf(character_number);
      if (index !== -1) {
        game_state.terrain_effects[shield_index].character_list.splice(index, 1);
      }
    }
}

function receiveMoveLandmineExplosions(mines_exploded, mines_damage, character_number) {
    var character = character_detailed_info[character_number];
    for (let i = 0; i < mines_exploded.length; i++) {
      var mine_position = mines_exploded[i];
      var cell = document.getElementById('cell_' + mine_position);
      cell.src = fogOrPic(mine_position);
      var index = game_state.landmines.positions.indexOf(mine_position);
      if (index > -1) {
        game_state.landmines.positions.splice(index,1);
      }
      game_state.landmines.knowers[mine_position] = [];
    }

    if (mines_damage > 0) {
      explosion_audio.play();
      do_damage(character_number, mines_damage);
      var message = character.name + " подрывается на минах получая " + mines_damage + " урона";
      pushToList(message);
    }
}

function receiveMoveSubstractActions(character_number, distance) {

  character_state.move_action[character_number] = character_state.move_action[character_number] - parseFloat(distance);
}

function receiveMoveSniperPassive(character_number) {
  var effects_object = character_state.special_effects[character_number]
  if (effects_object.hasOwnProperty("sniper_passive")) {
    var current_attack_bonus = effects_object.sniper_passive.attack_bonus
    var current_damage_bonus = effects_object.sniper_passive.damage_bonus
    character_state.attack_bonus[character_number] = character_state.attack_bonus[character_number] - current_attack_bonus + sniper_passive_penalty
    character_state.damage_bonus[character_number] = character_state.damage_bonus[character_number] - current_damage_bonus
    character_state.special_effects[character_number].sniper_passive.attack_bonus = sniper_passive_penalty
    character_state.special_effects[character_number].sniper_passive.damage_bonus = 0
  } else {
    var sniper_passive_object = {}
    sniper_passive_object.attack_bonus = sniper_passive_penalty
    sniper_passive_object.damage_bonus = 0
    character_state.special_effects[character_number].sniper_passive = sniper_passive_object
    character_state.attack_bonus[character_number] = character_state.attack_bonus[character_number] + sniper_passive_penalty
  }
}

function receiveMoveCarryAction(carry_target_index, carry_to_position) {
  var carry_from_position = character_state.position[carry_target_index];
  receiveMoveBasicState(carry_to_position, carry_from_position, carry_target_index);
  receiveMoveImageState(carry_to_position, carry_from_position, carry_target_index);
}

// Move related skills
function jump(to_index, to_cell) {
  var chosen_character_index = character_chosen.char_id;
  var chosen_index = character_state.position[chosen_character_index];

  var distance = findDistance(to_index, chosen_index)
  var max_distance = findJumpDistance(chosen_character_index);

  if (distance <= max_distance) {
    var accumulated_cover = get_accumulated_cover(chosen_index, to_index);

    if (accumulated_cover < jump_cover_impossible_threshold) {
      var toSend = {};
      toSend.room_number = my_room;
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.user_index = chosen_character_index;
      toSend.movement_object = constructMoveSendObject(chosen_index, to_index, chosen_character_index, distance)

      clear_containers();
      socket.sendMessage(toSend);
    } else {
      alert("Слишком много препятствий чтобы их перепрыгнуть");
    }
  } else {
    alert("Кенгуру может прыгнуть на 10 метров, а вы нет");
  }
}

function receiveJumpSubstractActions(character_number) {
  character_state.bonus_action[character_number] = character_state.bonus_action[character_number] - 1;
}

// Select character functions

function selectCharacterHandleChosenObject(character_number, index, cell) {
  character_chosen.char_id = character_number
  character_chosen.char_position = index
  character_chosen.cell = cell
  character_chosen.weapon_id = character_state.current_weapon[character_number]
}

function selectCharacterConstructNameDisplay(name) {
  var name_display = document.createElement("h2");
  name_display.innerHTML = name;
  return name_display;
}

function selectCharacterConstructAvatarDisplayObject(avatar) {
  var avatar_display = document.createElement("IMG");
  avatar_display.src = avatar;
  avatar_display.classList.add("avatar");
  return avatar_display;
}

function selectCharacterVisibleAvatarDisplay(character_number) {
  var main_action = character_state.main_action[character_number]
  var bonus_action = character_state.bonus_action[character_number]
  var move_action = Math.floor(character_state.move_action[character_number])

  var main_action_display = document.createElement("h2");
  main_action_display.id = "main_action_display";
  main_action_display.innerHTML = "Основных: " + main_action

  var bonus_action_display = document.createElement("h2");
  bonus_action_display.id = "bonus_action_display";
  bonus_action_display.innerHTML = "Бонусных: " + bonus_action

  var move_action_display = document.createElement("h2");
  move_action_display.id = "move_action_display";
  move_action_display.innerHTML = "Передвижение: " + move_action

  if (character_state.invisibility[character_number] != "all") {// в инвизе
    var invise_display = document.createElement("IMG");
    invise_display.src = INVISE_IMAGE;
    invise_display.style.height = '50px';
    invise_display.style.width = '50px';
  }

  if (character_state.special_effects[character_number].hasOwnProperty("aim")) {//  Прицелен
    var aim_display = document.createElement("IMG");
    aim_display.src = AIM_IMAGE;
    aim_display.style.height = '50px';
    aim_display.style.width = '50px';
  }

  weapon_info_container.html("")
  weapon_info_container.append(main_action_display)
  weapon_info_container.append(bonus_action_display)
  weapon_info_container.append(move_action_display)
  weapon_info_container.append(invise_display)
  weapon_info_container.append(aim_display)
  weapon_info_container.show()
}

function selectCharacterVisibleConstructDisplays(character, character_number) {
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

  var tired_percent = parseFloat(character_state.stamina[character_number])/parseFloat(stamina_values[character.stamina])
  tired_percent = Math.floor(tired_percent*100)

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
}

function selectCharacterConstructMoveButton(index, cell) {
  var move_button = document.createElement("button");
  move_button.innerHTML = "Перемещение";
  move_button.index = index;
  move_button.cell = cell;
  move_button.onclick = function(event) {
    var character_picked = event.target
    var character_number = game_state.board_state[character_picked.index];
    var move_actions_left = character_state.move_action[character_number]
    if (move_actions_left > 0) {
      clear_containers()
      choose_character_to_move(character_picked.index, character_picked.cell, true);
    } else {
      alert("Вы потратили все перемещения на этом ходу!")
    }
  }
  return move_button;
}

function selectCharacterConstructDeleteButton(index, character_number) {
  var delete_button = document.createElement("button");
  delete_button.innerHTML = "Уничтожить";
  delete_button.index = index;
  delete_button.onclick = function(event) {
    delete_character(index, character_number);
  }
  return delete_button;
}

function selectCharacterConstructVisibilityButton(character_number) {
  var change_character_visibility_button = document.createElement("button");
  var visibility_message = "";
  if (character_state.visibility[character_number] == 0) {
    visibility_message = "Открыть доступ";
  } else {
    visibility_message = "Закрыть доступ";
  }
  change_character_visibility_button.innerHTML = visibility_message;
  change_character_visibility_button.onclick = function(event) {
    change_character_visibility(character_number);
  }
  return change_character_visibility_button;
}

function selectCharacterConstructDamageButton(character_number) {
  var damage_button = document.createElement("button");
  damage_button.innerHTML = "Нанести урон";
  damage_button.onclick = function(event) {
    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      var damage = parseInt(damage_field.value);
      var HP_display = document.getElementById("HP_display");
      var new_HP = character_state.HP[character_number] - damage;
      HP_display.innerHTML = "ХП: " + new_HP;

      var toSend = {};
      toSend.command = 'deal_damage';
      toSend.type = 'damage';
      toSend.character_number = character_number;
      toSend.damage = damage;
      toSend.room_number = my_room;
      socket.sendMessage(toSend);
    }
  }
  return damage_button;
}

function selectCharacterConstructStaminaButton(character_number) {
  var stamina_button = document.createElement("button");
  stamina_button.innerHTML = "Вычесть выносливость";
  stamina_button.onclick = function(event) {
    var stamina_field = document.getElementById("stamina_field");
    if (!(stamina_field.value === "")) {
      var stamina_change = parseInt(stamina_field.value);
      var stamina_display = document.getElementById("tired_display");
      var new_stamina = character_state.stamina[character_number] - stamina_change;
      stamina_display.innerHTML = "Выносливость: " + new_stamina;

      var toSend = {};
      toSend.command = 'deal_damage';
      toSend.type = 'stamina';
      toSend.character_number = character_number;
      toSend.stamina_change = stamina_change;
      toSend.room_number = my_room;
      socket.sendMessage(toSend);
    }
  }
  return stamina_button;
}

function selectCharacterConstructDamageField() {
  var damage_field = document.createElement("input");
  damage_field.id = "damage_field";
  damage_field.type = "number";
  damage_field.placeholder = "Урон";
  return damage_field;
}

function selectCharacterConstructStaminaField() {
  var stamina_field = document.createElement("input");
  stamina_field.id = "stamina_field";
  stamina_field.type = "number";
  stamina_field.placeholder = "Стамина";
  return stamina_field;
}

function selectCharacterConstructEffectSelect() {
  var effect_select = document.createElement("select");
  effect_select.id = "effect_select";

  for (let i = 0; i < effect_list.length; i++) {
    var current_option = document.createElement("option");
    current_option.innerHTML = effect_list[i];
    current_option.value = i;
    effect_select.appendChild(current_option);
  }
  return effect_select;
}

function selectCharacterConstructEffectButton(character_number) {
  var effect_button = document.createElement("button");
  effect_button.innerHTML = "Применить эффект";
  effect_button.onclick = function(event) {
    var effect_select = document.getElementById("effect_select");
    var effect_index = effect_select.value;
    send_effect_command(character_number, effect_index);
  }
  return effect_button;
}

function selectCharacterConstructSearchButton(index) {
  var search_button = document.createElement("button");
  search_button.innerHTML = "Обыскать";
  search_button.index = index;
  search_button.onclick = function(event) {
    search_action(event.target);
  }
  return search_button;
}

function selectCharacterConstructSimpleRollButton(character) {
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
  return simple_roll_button;
}

function selectCharacterConstructAttackButton(character_number, cell) {
  var attack_button = document.createElement("button");
  attack_button.innerHTML = "Атаковать";
  attack_button.onclick = function(event) {
    var main_actions_left = character_state.main_action[character_number]
    if (main_actions_left > 0) {
      choose_character_to_attack(cell)
    } else {
      alert("У вас не осталось действий!")
    }
  }
  return attack_button;
}

function selectCharacterConstructWeaponMiniDisplay(character_number) {
  var default_weapon_index = character_state.current_weapon[character_number]
  var default_weapon = weapon_detailed_info[default_weapon_index]

  var weapon_mini_display = document.createElement("IMG");
  weapon_mini_display.id = "weapon_mini_display"
  weapon_mini_display.src = default_weapon.avatar;
  weapon_mini_display.classList.add("mini_display");
  weapon_mini_display.onmouseenter = function(event) {
    weapon_info_container.html("")
    var weapon_index = character_state.current_weapon[character_number]
    display_weapon_detailed(weapon_index, weapon_info_container, true)
  }

  weapon_mini_display.onmouseleave = function(event) {
    weapon_info_container.html("")
    weapon_info_container.hide()
  }

  weapon_mini_display.onclick = function() {
      show_weapon_modal(character_number, 0);
  }
  return weapon_mini_display;
}

function selectCharacterConstructArmorMiniDisplay(character_number) {
  var armor_mini_display = document.createElement("IMG");
  armor_mini_display.id = "armor_mini_display";
  armor_mini_display.src = armor_image(character_number);
  armor_mini_display.classList.add("mini_display");
  armor_mini_display.onmouseenter = function(event) {
    weapon_info_container.html("")
    display_armor_detailed(character_number, weapon_info_container)
  }

  armor_mini_display.onmouseleave = function(event) {
    weapon_info_container.html("")
    weapon_info_container.hide()
  }
  return armor_mini_display;
}

function selectCharacterConstructSpiritMiniDisplay(character_number) {
  var spirit_mini_display = document.createElement("IMG");
  spirit_mini_display.id = "spirit_mini_display";
  spirit_mini_display.src = spirit_image(character_number);
  spirit_mini_display.classList.add("mini_display");
  spirit_mini_display.onmouseenter = function(event) {
    weapon_info_container.html("")
    display_spirit_detailed(character_number, weapon_info_container)
  }

  spirit_mini_display.onmouseleave = function(event) {
    weapon_info_container.html("")
    weapon_info_container.hide()
  }
  return spirit_mini_display;
}

function selectCharacterConstructButtonList(move_button, search_button, attack_button, simple_roll_button, delete_button, damage_button,
  damage_field, change_character_visibility_button, effect_select, effect_button, stamina_button,
    stamina_field) {
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
  line2.appendChild(search_button);
  line3.appendChild(attack_button);
  line4.appendChild(simple_roll_button);
  if (my_role == "gm") {
    line5.appendChild(delete_button);
    line6.appendChild(damage_button);
    line6.appendChild(damage_field);
    line7.appendChild(stamina_button);
    line7.appendChild(stamina_field);
    line8.appendChild(change_character_visibility_button);
    line9.appendChild(effect_select);
    line10.appendChild(effect_button);
  }

  button_list.appendChild(line1);
  button_list.appendChild(line2);
  button_list.appendChild(line3);
  button_list.appendChild(line4);
  if (my_role == "gm") {
    button_list.appendChild(line5);
    button_list.appendChild(line6);
    button_list.appendChild(line7);
    button_list.appendChild(line8);
    button_list.appendChild(line9);
    button_list.appendChild(line10);
  }
  return button_list;
}

function select_character(index, cell) {
  var character_number = game_state.board_state[index]

  if (character_state.invisibility[character_number] == "all" || character_state.invisibility[character_number] == my_name) {
  var character = character_detailed_info[character_number];

  clear_containers();
  selectCharacterHandleChosenObject(character_number, index, cell);

  var name_display = selectCharacterConstructNameDisplay(character.name);
  var avatar_container = document.createElement("div");
  var avatar_display = selectCharacterConstructAvatarDisplayObject(character.avatar);

  avatar_container.appendChild(avatar_display)
  character_info_container.append(name_display);
  character_info_container.append(avatar_container);

  if (my_role == "gm" || character_state.visibility[character_number] == 1) {

    avatar_display.onclick = function() {
      show_modal(character_number, 0);
    }

    avatar_display.onmouseenter = function(event) {
      selectCharacterVisibleAvatarDisplay(character_number);
    }

    avatar_display.onmouseleave = function(event) {
      weapon_info_container.html("")
      weapon_info_container.hide()
    }

    selectCharacterVisibleConstructDisplays(character, character_number);

  var move_button = selectCharacterConstructMoveButton(index, cell);
  var attack_button = selectCharacterConstructAttackButton(character_number, cell);
  var search_button = selectCharacterConstructSearchButton(index);
  var simple_roll_button = selectCharacterConstructSimpleRollButton(character);

  if (my_role == "gm") {
    var delete_button = selectCharacterConstructDeleteButton(index, character_number);
    var change_character_visibility_button = selectCharacterConstructVisibilityButton(character_number);
    var damage_button = selectCharacterConstructDamageButton(character_number);
    var damage_field = selectCharacterConstructDamageField();
    var stamina_button = selectCharacterConstructStaminaButton(character_number);
    var stamina_field = selectCharacterConstructStaminaField();
    var effect_select = selectCharacterConstructEffectSelect();
    var effect_button = selectCharacterConstructEffectButton(character_number);
  }

  var weapon_mini_display = selectCharacterConstructWeaponMiniDisplay(character_number);
  var armor_mini_display = selectCharacterConstructArmorMiniDisplay(character_number);
  var spirit_mini_display = selectCharacterConstructSpiritMiniDisplay(character_number);

  avatar_container.append(weapon_mini_display);
  avatar_container.append(armor_mini_display);
  avatar_container.append(spirit_mini_display);

  var button_list = selectCharacterConstructButtonList(move_button, search_button, attack_button, simple_roll_button,
     delete_button, damage_button, damage_field, change_character_visibility_button, effect_select, effect_button, stamina_button, stamina_field);

  character_info_container.append(button_list);

} else {
  var hp_percent = parseFloat(character_state.HP[character_number])/parseFloat(HP_values[character.stamina])
  hp_percent = Math.floor(hp_percent*100)

  var HP_display = document.createElement("h2");
  HP_display.id = "HP_display";
  HP_display.innerHTML = "ХП: " + hp_percent + "%";

  var tired_percent = parseFloat(character_state.stamina[character_number])/parseFloat(stamina_values[character.stamina])
  tired_percent = Math.floor(tired_percent*100)

  var tired_display = document.createElement("h2");
  tired_display.id = "tired_display";
  tired_display.innerHTML = "Выносливость: " + tired_percent + "%";

  character_info_container.append(HP_display);
  character_info_container.append(tired_display);
}

  tiny_animate_containers()

}

}

// Delete - Select

function delete_character(index, character_number) {
  clear_containers()
  var toSend = {};
  toSend.command = 'delete_object';
  toSend.room_number = my_room;
  toSend.index = index;
  toSend.character_number = character_number
  socket.sendMessage(toSend);
}

function change_weapon(character_number, weapon_index) {
  character_state.current_weapon[character_number] = weapon_index
  character_chosen.weapon_id = weapon_index

  var weapon = weapon_detailed_info[weapon_index]

  var weapon_mini_display = document.getElementById("weapon_mini_display");
  weapon_mini_display.src = weapon.avatar;
}

function display_weapon_detailed(weapon_index, container, showImage) {
  var default_weapon = weapon_detailed_info[weapon_index]

  var weapon_range_display = document.createElement("h2");
  weapon_range_display.id = "weapon_range_display";
  weapon_range_display.innerHTML = "Дальность: " + default_weapon.range

  var weapon_damage_display = document.createElement("h2");
  weapon_damage_display.id = "weapon_damage_display";
  weapon_damage_display.innerHTML = "Урон: " + default_weapon.damage[0] + 'd' + default_weapon.damage[1]

  var weapon_name_display = document.createElement("h2");
  weapon_name_display.id = "weapon_name_display";
  weapon_name_display.innerHTML = default_weapon.name

  if (showImage) {
    var weapon_avatar_display = document.createElement("IMG");
    weapon_avatar_display.id = "weapon_avatar_display"
    weapon_avatar_display.src = default_weapon.avatar;
    weapon_avatar_display.style.width = '250px';
    weapon_avatar_display.style.height = '250px';
  }
  container.append(weapon_name_display)
  if (showImage) {
    container.append(weapon_avatar_display)
  }
  container.append(weapon_range_display)
  container.append(weapon_damage_display)
  container.show()
}

function display_armor_detailed(character_number, container) {
  var KD_display = document.createElement("h2");
  var KD_value = parseInt(character_state.KD_points[character_number]) + parseInt(character_state.bonus_KD[character_number])
  KD_display.innerHTML = "КД: " + KD_value;

  var melee_resist_display = document.createElement("h2");
  var melee_resist = character_state.melee_resist[character_number]*100;
  melee_resist_display.innerHTML = "Милли резист: " + melee_resist + "%";

  var bullet_resist_display = document.createElement("h2");
  var bullet_resist = character_state.bullet_resist[character_number]*100;
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

function send_effect_command(character_number, effect_index) {
  var toSend = {};
  toSend.command = 'apply_effect';
  toSend.room_number = my_room;
  toSend.effect_number = effect_index;
  toSend.character_number = character_number;
  socket.sendMessage(toSend);

  alert("Вы применили эффект");
}

function delete_object_command(index) {
  var toSend = {};
  toSend.command = 'delete_object';
  toSend.room_number = my_room;
  toSend.index = index;
  socket.sendMessage(toSend);
}

function delete_object(event) {
  clear_containers()

  delete_object_command(event.target.index)
}

function select_obstacle(index, cell) {
  clear_containers()
  var obstacle_id = game_state.board_state[index] * (-1);
  var obstacle = obstacle_detailed_info[obstacle_id];

  // keep track of last chosen obstale to quickly add to the map
  last_obstacle = obstacle_id

  let name = obstacle.name;
  let avatar = obstacle.avatar;

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
    delete_button.onclick = function(event) {
      delete_object(event);
    }
    character_info_container.append(delete_button);
  }

  tiny_animate_containers()

}

function choose_character_to_move(index, cell, showVisual) {
  character_chosen.in_process = 1
  character_chosen.char_position = index;
  character_chosen.char_id = game_state.board_state[index];
  if (showVisual) {
    cell.src = "./images/loading.webp";
  }
}

function undo_selection() {
  if (character_chosen.in_process != 0) {
    character_chosen.in_process = 0
    var old_cell = document.getElementById("cell_" + character_chosen.char_position);
    old_cell.src = get_object_picture(character_chosen.char_id);
  }
}

function show_weapon_modal(character_number, starting_index) {
  hide_modal()
  var character = character_detailed_info[character_number]
  var inventory = character.inventory

  var weapon_table = $("<table>");
  var table_size = 3

  for (let i = 0; i < table_size; i++) {
    var row = $("<tr>");
    for (let j = 0; j < table_size; j++) {
      var index = starting_index + table_size*i + j
      if (index < inventory.length) {
        var weapon_number = inventory[index]
        var column = $("<th>");
        var weapon_icon = $("<IMG>");
        var avatar = QUESTION_IMAGE
        if (weapon_detailed_info[weapon_number].hasOwnProperty('avatar')) {
          avatar = weapon_detailed_info[weapon_number].avatar
        }
        weapon_icon.addClass('weapon_icon');
        weapon_icon.attr('width', '100px');
        weapon_icon.attr('weapon_number', weapon_number);
        weapon_icon.attr('height', '100px');
        weapon_icon.attr('src', avatar);
        weapon_icon.on('click', function(event) {
          var weapon_num = event.target.getAttribute('weapon_number');
          change_weapon(character_number, weapon_num);
          hide_modal()
        });
        weapon_icon.on('mouseenter', function(event) {
          var weapon_num = event.target.getAttribute('weapon_number');
          display_weapon_detailed(weapon_num, skill_description_container, false)
        })

        weapon_icon.on('mouseleave', function(event) {
          skill_description_container.html('');
        })
        column.append(weapon_icon);
        row.append(column);
      }
    }
    weapon_table.append(row);
  }
  skill_modal_content.append(weapon_table);

  if (inventory.length > starting_index + table_size*table_size) {// there are more skills to display
    var next_page_button = $("<IMG>");
    next_page_button.attr('width', '100px');
    next_page_button.attr('height', '50px');
    next_page_button.attr('src', RIGHT_ARROW_IMAGE);
    next_page_button.on("click", function(event) {
      show_weapon_modal(character_number, starting_index + table_size*table_size);
    })

    next_page_button_container.append(next_page_button);
  }
  skill_modal.show();


}

function show_modal(character_number, starting_index) {
  hide_modal();
  var character = character_detailed_info[character_number]
  var skillset = character.skillset

  var skill_table = $("<table>");

  var table_size = 3

  for (let i = 0; i < table_size; i++) {
    var row = $("<tr>");
    for (let j = 0; j < table_size; j++) {
      var index = starting_index + table_size*i + j
      if (index < skillset.length) {
        var skill_number = skillset[index]
        var column = $("<th>");
        var skill_icon = $("<IMG>");
        var avatar = QUESTION_IMAGE
        if (skill_detailed_info[skill_number].hasOwnProperty('avatar')) {
          avatar = skill_detailed_info[skill_number].avatar
        }
        skill_icon.addClass('skill_icon');
        skill_icon.attr('width', '100px');
        skill_icon.attr('skill_number', skill_number);
        skill_icon.attr('height', '100px');
        skill_icon.attr('src', avatar);
        skill_icon.on('click', function(event) {
          var position = character_state.position[character_number]
          var cell = document.getElementById("cell_" + position);
          use_skill(event.target.getAttribute('skill_number'), character_number, position, cell)
          hide_modal()
        });
        skill_icon.on('mouseenter', function(event) {
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
            var skill_cost = "Неизвестно"
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
            var skill_description = "Мы сами не знаем что оно делает"
          }
          skill_description_object.html(skill_description);
          skill_description_container.append(skill_description_object);
        })

        skill_icon.on('mouseout', function(event) {
          skill_description_container.html('');
        })
        column.append(skill_icon);
        row.append(column);
      }
    }
    skill_table.append(row);
  }
  skill_modal_content.append(skill_table);

  if (skillset.length > starting_index + table_size*table_size) {// there are more skills to display
    var next_page_button = $("<IMG>");
    next_page_button.attr('width', '100px');
    next_page_button.attr('height', '50px');
    next_page_button.attr('src', RIGHT_ARROW_IMAGE);
    next_page_button.on("click", function(event) {
      show_modal(character_number, starting_index + table_size*table_size);
    })

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
  var position = character_state.position[character_number]
  var board_cell = document.getElementById('cell_' + position);
  board_cell.style.transform = "";
}

// attack related helpers

function choose_character_to_attack(cell) {
  character_chosen.in_process = 2
  cell.src = "./images/attack_placeholder.jpg";
}

function stop_attack() {
  character_chosen.in_process = 0
  var character_number = character_chosen.char_id;
  var position = character_state.position[character_number];
  var old_cell = document.getElementById("cell_" + position);
  old_cell.src = get_object_picture(character_number);
}

function stop_skill() {
  character_chosen.in_process = 0
  var character_number = character_chosen.char_id;
  var position = character_state.position[character_number];
  var old_cell = document.getElementById("cell_" + position);
  old_cell.src = get_object_picture(character_number);
}

// initiative related functions

function resetInitiative() {
  initiative_order_array = [];
  initiative_order_container.html('');

}

function construct_initiative_image(character_number, i) {
  var character = character_detailed_info[character_number]
  var query_string = '<img> id="initiative_image_' + i + '"'
  var img = $(query_string)
  img.attr('src', character.avatar);
  img.attr('height', '50px');
  img.attr('width', '50px');
  img.attr('array_position', i);
  img.addClass("initiative_image");
  img.on("mouseenter", function() {
    var isVisible = character_state.invisibility[character_number] == 'all' || character_state.invisibility[character_number] == my_name;
    var position = character_state.position[character_number]
    var isNotFogged = game_state.fog_state[position] == 0 || my_role == 'gm';
    if (isVisible && isNotFogged) {
      var cell = document.getElementById('cell_' + position);
      cell.style.transform = "scale(1.2)";
    }
  });
  img.on("mouseleave", function() {
    unhover_character(character_number);
  });
  img.click(function() {
    var position = character_state.position[character_number]
    var cell = document.getElementById('cell_' + position);
    //select_character(position, cell)
    no_shift_onclick(my_role, gm_control_mod, game_state, character_chosen.in_process, cell, position)
  })
  img.attr('draggable', true);
  img.on("dragstart", function(event) {
    dragged = event.target;
  });
  return img;
}

function display_initiative_line() {
  initiative_order_container.html("");
  for (let i = 0; i < initiative_order_array.length; i++) {
    var img = construct_initiative_image(initiative_order_array[i], i);
    img.appendTo(initiative_order_container);
  }
}

// roll something

function roll_x(x) {
  return Math.floor(Math.random() * x) + 1
}

function rollSearch(intelligence, mod) {
  return intelligence + roll_x(20) + mod;
}

function rollInitiative() {
  for (let i = 0; i < initiative_order_array.length; i++) {
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
  socket.sendMessage(toSend);
}

function roll_evasion(target_character_number) {
  var target_character = character_detailed_info[target_character_number];
  var evade_roll = roll_x(20) + parseInt(target_character.agility) + character_state.universal_bonus[target_character_number] + character_state.evade_bonus[target_character_number]
  return evade_roll
}

// managing chat

function pushToList(message) {
  for (let i=1; i < CHAT_CASH; i++) {
    var element_to_copy = $('[data-name="notifications_list_element_' + i + '"]');
    var element_to_paste = $('[data-name="notifications_list_element_' + (i-1) + '"]');

    element_to_paste.text(element_to_copy.text());
  }
  var top_element = $('[data-name="notifications_list_element_' + (CHAT_CASH-1) + '"]');
  top_element.text(message);

  if (notifications_container.is(":hidden")) {
    chat_button.addClass("is-red")
  }
}

function changeChatVisibility() {
  if (chat_button.hasClass("is-red")) {
    chat_button.removeClass("is-red")
  }
  if (notifications_container.is(":hidden")) {
    notifications_container.show();
  } else {
    notifications_container.hide();
  }
}

// cover mechanics

function cover_mod(accumulated_cover) {
  var mod = {}
  mod.isPossible = true
  mod.cover_level = accumulated_cover
  switch(accumulated_cover) {
    case 0:
      mod.attack_bonus = 0
      mod.advantage_bonus = 0
      break;
    case 1:
      mod.attack_bonus = 0
      mod.advantage_bonus = 0
      break;
    case 2:
      mod.attack_bonus = -1
      mod.advantage_bonus = 0
      break;
    case 3:
      mod.attack_bonus = -2
      mod.advantage_bonus = 0
      break;
    case 4:
        mod.attack_bonus = -2
        mod.advantage_bonus = -1
        break;
    case 5:
        mod.attack_bonus = -3
        mod.advantage_bonus = -1
        break;
    case 6:
        mod.attack_bonus = -3
        mod.advantage_bonus = -2
        break;
    case 7:
        mod.attack_bonus = -4
        mod.advantage_bonus = -2
        break;
    case 8:
        mod.attack_bonus = -4
        mod.advantage_bonus = -3
        break;
    case 9:
        mod.attack_bonus = -5
        mod.advantage_bonus = -3
        break;
    default:
        mod.isPossible = false
        break;
  }

  return mod
}

function compute_cover(distance, cover) {
  var result = 0
  if (distance < 0.15) {
    result = cover
  } else if (distance < 0.3) {
    result = cover * 0.75
  } else if (distance < 0.5) {
    result = cover * 0.5
  } else if (distance < 0.65) {
    result = cover * 0.25
  } else {
    result = 0
  }

  return result
}

function get_accumulated_cover(user_pos, target_pos) {
  var accumulated_cover = 0
  var candidate_cells = cells_on_line(user_pos, target_pos, game_state.size)
  for (let i = 0; i < candidate_cells.length; i++) {
    var current_cell = candidate_cells[i]
    if (game_state.board_state[current_cell] < 0) {// это препятствие
      var obstacle = obstacle_detailed_info[Math.abs(game_state.board_state[current_cell])]
      var distance = distance_to_line(user_pos, target_pos, game_state.size, current_cell)
      accumulated_cover = accumulated_cover + compute_cover(distance, obstacle.cover)
    }
  }
  accumulated_cover = Math.ceil(accumulated_cover)
  return accumulated_cover
}

// Miscelaneous actions

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
  var character_number = game_state.board_state[index]
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
    toSend.player_name = my_name
    toSend.mines_detected = []
    toSend.character_number = character_number

    var landmine_candidates = index_in_radius(index, landmine_detection_radius)
    for (let i = 0; i < landmine_candidates.length; i++) {
        if (game_state.landmines.positions.includes(landmine_candidates[i])) {
          toSend.mines_detected.push(landmine_candidates[i])
        }
      }
      socket.sendMessage(toSend);

  } else {
    alert("Обыск во время боя стоит бонусное действие!")
  }
}

function computeInitiative(agility) {
  return agility*2 + roll_x(20);
}

function change_battle_mod() {
  if (game_state.battle_mod == 1) {
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

// Attack related passives

function adaptive_fighting_bonus(attack_type, attacker_id) {
  var bonus = 0;
  var adaptive_state = character_state.special_effects[attacker_id].adaptive_fighting;
  if (attack_type == "ranged"||attack_type == "energy") {
    if (adaptive_state == 0) {
      bonus = 1;
      console.log("Сработал рейнджовый стак универсальности");
    }
  } else if (attack_type == "melee") {
    if (adaptive_state == 1) {
      bonus = 1;
      console.log("Сработал милли стак универсальности");
    }
  }
  return bonus;
}

// attack related things (computation)

function calculateAdvantage(type, attacker, target, advantage_bonus) {
  var advantage = 0;
  if ((type == "ranged")||(type == "energy")) {
    advantage = character_state.ranged_advantage[attacker];
  } else if (type == "melee") {
    advantage = character_state.melee_advantage[attacker];
  }

  if (character_state.special_effects[attacker].hasOwnProperty('adaptive_fighting')) {
    advantage += adaptive_fighting_bonus(type, attacker);
  }
  advantage = advantage - character_state.defensive_advantage[target] + advantage_bonus;
  return advantage;
}

function rollWithAdvantage(advantage) {
  var number_of_rolls = 1 + Math.abs(advantage);
  var rolls_array = [];
  for (let i = 0; i < number_of_rolls; i++) {
    let roll = roll_x(20);
    rolls_array.push(roll);
  }
  var toRet = rolls_array[0];
  if (advantage > 0) {
    toRet = Math.max(...rolls_array);
  } else if (advantage < 0) {
    toRet = Math.min(...rolls_array);
  }
  return toRet;
}

function roll_attack(type, attacker, target, advantage_bonus) {
  var advantage = calculateAdvantage(type, attacker, target, advantage_bonus);

  var roll = rollWithAdvantage(advantage);
  return roll;
}

function character_KD(target_character_number) {
  return parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number])
}

function assign_moves(character_number) {
  var character = character_detailed_info[character_number]
  character_state.move_action[character_number] = parseFloat(move_action_map[character.agility]);
  if (character.hasOwnProperty("extra_movement")) {
    character_state.move_action[character_number] = character_state.move_action[character_number] + parseFloat(character.extra_movement);
  }
}

function weapon_damage_bonus(raw_damage, weapon, character_number) {
  var character = character_detailed_info[character_number]
  var total_damage = raw_damage
  if (weapon.type == 'melee') {
    total_damage = total_damage + strength_damage_map[parseInt(character.strength)]
  } else if (weapon.type == 'throwing') {
    total_damage = total_damage + strength_damage_map[Math.ceil(parseInt(character.strength)/2)]
  } else if (weapon.type == 'ranged') {
    if (character_state.special_effects[character_number].hasOwnProperty("aim") && weapon.hasOwnProperty("aim_bonus")) {
      total_damage = total_damage + parseInt(weapon.aim_bonus)
    }
  }
  total_damage = total_damage + character_state.damage_bonus[character_number]
  return total_damage
}

function perform_attack(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var target_character_number = game_state.board_state[index]
  var weapon = weapon_detailed_info[character_chosen.weapon_id]

  if (isInRange(index, user_position, weapon.range)) {
    var accumulated_cover = get_accumulated_cover(user_position, index)
    var cover_modifier = cover_mod(accumulated_cover)

    var toSend = {};
    toSend.command = 'resolve_attack';
    toSend.room_number = my_room;
    toSend.attacker_id = user_character_number
    toSend.attacker_position = user_position
    toSend.target_id = target_character_number
    toSend.attack_type = weapon.type
    toSend.cover_level = cover_modifier.cover_level
    toSend.user_invisibility_ended = 0

    toSend = sendAttack_quick_attack_check(toSend, weapon)
    toSend = sendAttack_invisibility_over_check(toSend, user_character_number, weapon.type);

    if (cover_modifier.isPossible) {
      toSend = attack_hitting_template(toSend, weapon, user_character_number, target_character_number, cover_modifier, 0);
    } else {
      toSend.outcome = "full_cover"
    }

    toSend = sendAttack_drobovik_slow_check(toSend, target_character_number, weapon)
    socket.sendMessage(toSend);

  } else {
      alert("Далековато...")
  }
  stop_attack()
}

function attack_obstacle(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_chosen.weapon_id]

  if (isInRange(index, user_position, weapon.range)) {
    var target_obstacle_number = Math.abs(game_state.board_state[index]);
    var target_obstacle = obstacle_detailed_info[target_obstacle_number]

    var accumulated_cover = get_accumulated_cover(user_position, index)
    var cover_modifier = cover_mod(accumulated_cover)

    var toSend = {};
    toSend.command = 'attack_obstacle';
    toSend.room_number = my_room;
    toSend.attacker_id = user_character_number
    toSend.attacker_position = user_position
    toSend.target_id = target_obstacle_number
    toSend.user_invisibility_ended = 0
    toSend.attack_type = weapon.type
    toSend.cover_level = cover_modifier.cover_level
    toSend.target_position = index;

    if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
      toSend.quick_attack_ready = true;
    }

    if (character_state.invisibility[user_character_number] != "all" && weapon.type != "throwing") {
      toSend.user_invisibility_ended = 1
    }

    if (cover_modifier.isPossible) {
      if (target_obstacle.hasOwnProperty("toughness")) {
        var attack_roll = roll_x(20);
        var damage = 0;
        switch(attack_roll) {
          case 19:
            damage = damage = weapon.damage[1] * weapon.damage[0]
            damage = weapon_damage_bonus(damage, weapon, user_character_number)
            break;
          case 20:
            damage = damage = weapon.damage[1] * weapon.damage[0]
            damage = weapon_damage_bonus(damage, weapon, user_character_number)
            damage *= 2;
            break;
          default:
            for (let i = 0; i < weapon.damage[0]; i++) {
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
    socket.sendMessage(toSend);

  } else {
    alert("Далековато...");
  }
  stop_attack();
}

function compute_damage(weapon, character_number, attack_roll, target_number) {
  var damage = 0
  var character = character_detailed_info[character_number]

  if (character.special_type == "sniper") {
    if (attack_roll < 16) {
      for (let i = 0; i < weapon.damage[0]; i++) {
        damage = damage + roll_x(weapon.damage[1])
      }

      damage = weapon_damage_bonus(damage, weapon, character_number)
    } else {
      if (character_state.special_effects[target_number].hasOwnProperty("weakspot") && character_state.special_effects[target_number].weakspot.hunter_id == character_number) {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            damage = weapon_damage_bonus(damage, weapon, character_number)
            damage = damage*2
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          damage = weapon_damage_bonus(damage, weapon, character_number)
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          damage = weapon_damage_bonus(damage, weapon, character_number)
          damage = damage*5
          break;
          default:
            damage = weapon.damage[1] * weapon.damage[0]
            damage = weapon_damage_bonus(damage, weapon, character_number)
        }
      } else {
        switch (attack_roll) {
          case 18:
            damage = weapon.damage[1] * weapon.damage[0]
            damage = weapon_damage_bonus(damage, weapon, character_number)
            break;
          case 19:
          damage = weapon.damage[1] * weapon.damage[0]
          damage = weapon_damage_bonus(damage, weapon, character_number)
          damage = damage*2
          break;
          case 20:
          damage = weapon.damage[1] * weapon.damage[0]
          damage = weapon_damage_bonus(damage, weapon, character_number)
          damage = damage*3
          break;
          default:
          for (let i = 0; i < weapon.damage[0]; i++) {
            damage = damage + roll_x(weapon.damage[1])
          }
          damage = weapon_damage_bonus(damage, weapon, character_number)
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
    damage = weapon_damage_bonus(damage, weapon, character_number)

    if (attack_roll == 20) {
      damage = damage * 2
    }
  }

  if (weapon.type == "ranged") {
    var damage_type = "bullet"
  } else if (weapon.type == "melee") {
    var damage_type = "melee"
  } else if (weapon.type == "energy") {
      var damage_type = "energy"
  } else if (weapon.type == "throwing") {
      var damage_type = "melee"
  }

  switch(damage_type) {
    case "melee":
      var resist = character_state.melee_resist[target_number]
      console.log("Урон до резиста: " + damage)
      damage = parseInt(damage * (1.0 - resist))
      console.log("Урон после резиста: " + damage)
      break;
    case "bullet":
      var resist = character_state.bullet_resist[target_number]
      console.log("Урон до резиста: " + damage)
      damage = parseInt(damage * (1.0 - resist))
      console.log("Урон после резиста: " + damage)
      break;
    default:
      //nothing for now
  }

  return damage
}

function damage_skill_template(target_pos, user_pos, range, user_id, skill_id, bonus_attack, weapon, accumulated_cover) {
  if (isInRange(target_pos, user_pos, range)) {

    var target_character_number = game_state.board_state[target_pos]
    var attacking_character = character_detailed_info[user_id]

    var cover_modifier = cover_mod(accumulated_cover)

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_id
    toSend.target_id = target_character_number
    toSend.cover_level = accumulated_cover

    if (cover_modifier.isPossible) {
      attack_hitting_template(toSend, weapon, user_id, target_character_number, cover_modifier, bonus_attack)
    } else {
      toSend.outcome = "full_cover"
    }
    return toSend;

  } else {
    return null;
  }
}

function attack_hitting_template(toSend, weapon, user_id, target_character_number, cover_modifier, bonus_attack) {
  var target_character_KD = character_KD(target_character_number)
  var attack_roll = roll_attack(weapon.type, user_id, target_character_number, cover_modifier.advantage_bonus)

  if (attack_roll < 20) {// no crit
    toSend = sendAttack_cumulative_attack_roll(toSend, weapon.type, attack_roll, user_id, cover_modifier.attack_bonus, bonus_attack);
    var cumulative_attack_roll = toSend.attack_roll;

    if (cumulative_attack_roll > target_character_KD) {// Есть пробитие
      if (character_state.can_evade[target_character_number] == 1) {
        var evade_roll = roll_evasion(target_character_number)
        toSend.evade_roll = evade_roll
        if (evade_roll > cumulative_attack_roll) { //succesfully evaded
          toSend.outcome = "evaded"
        } else {
          var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
          toSend.damage_roll = damage_roll
          toSend.outcome = "damage_after_evasion"
        }
      } else {
        var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
        toSend.damage_roll = damage_roll
        toSend.outcome = "damage_without_evasion"
      }
    } else {
      toSend.outcome = "KD_block"
    }
  } else { // full crit
    toSend.attack_roll = attack_roll
    var damage_roll = compute_damage(weapon, user_id, attack_roll, target_character_number)
    toSend.damage_roll = damage_roll
    toSend.outcome = "full_crit"
  }
  return toSend;
}

function do_damage(character_number, damage) {
  if (!character_state.special_effects[character_number].hasOwnProperty("force_field_target")) {
    character_state.HP[character_number] = character_state.HP[character_number] - damage
  } else {
    var shield_index = character_state.special_effects[character_number].force_field_target.shield_index
    game_state.terrain_effects[shield_index].shield = game_state.terrain_effects[shield_index].shield - damage
    var message = "Щит принял урон на себя! Оставшаяся прочность: " + game_state.terrain_effects[shield_index].shield
    pushToList(message)
    if (game_state.terrain_effects[shield_index].shield <= 0) {// щит уничтожен
      var message = "Press F Щиту..."
      pushToList(message)
      var char_list = game_state.terrain_effects[shield_index].character_list
      for (let i = 0; i < char_list.length; i++) {
        var character_number = char_list[i]
        delete character_state.special_effects[character_number].force_field_target
      }
      delete_object_command(game_state.terrain_effects[shield_index].position)
      delete game_state.terrain_effects[shield_index]
    }
  }
}

function deal_AOE_damage(damage_object_array, user_index) {
  var cover_string = "";
  for (let i = 0; i < damage_object_array.length; i++) {
    var damage_object = damage_object_array[i];
    receiveAttack_outcome_switch(user_index, damage_object.target_id, damage_object.outcome, damage_object.attack_roll, damage_object.evade_roll, damage_object.damage_roll, damage_object.attack_type, cover_string)
  }
}

function findThrowRange(character) {
  return throw_base_range + parseInt(character.strength)*2
}

function findJumpDistance(character_number) {
  var character = character_detailed_info[character_number];
  var distance = jump_base_distance + Math.ceil(parseInt(character.strength)/2);
  return distance;
}

function melee_penalty(attack_type, target_id) {
  if (attack_type == "melee") {
    if (!character_state.special_effects[target_id].hasOwnProperty("meleed")) { // иначе эффект уже наложен, не повторяем
      character_state.ranged_advantage[target_id] -= 1
      var meleed_object = {}
      meleed_object.cooldown = 0
      character_state.special_effects[target_id].meleed = meleed_object
    }
    if (character_state.has_moved[target_id] == 1) {
      var cooldown = 1
    } else {
      var cooldown = 0
    }
    character_state.special_effects[target_id].meleed.cooldown = cooldown
  }
}

function receiveAttack_play_attack_sound(attack_type) {
  if (attack_type == "ranged") {
    var audio = gunshot_audio
  } else if (attack_type == "melee") {
    var audio = sword_audio
  } else {// default including energy and throwing
    var audio = suriken_audio
  }
  audio.play();
}

function receiveAttack_invisibility_end_check(invisibility_ended, attacker_id, attacker_position) {
  if (invisibility_ended == 1) {
    character_state.invisibility[attacker_id] = "all"
    var attacker_cell = document.getElementById('cell_' + attacker_position);
    attacker_cell.src = character_detailed_info[attacker_id].avatar;
  }
}

function receiveAttack_action_state(attacker_id) {
  character_state.has_moved[attacker_id] = 1
  if (game_state.battle_mod == 1) {
    character_state.stamina[attacker_id] -= stamina_attack_cost;
    character_state.main_action[attacker_id] -= 1;
  }
}

function aim_over_check(data) {
  if (data.hasOwnProperty("aim_over")) {
    delete character_state.special_effects[data.attacker_id].aim
  }
}

function quick_attack_check(data) {
  if (data.hasOwnProperty("quick_attack_ready")) {
    character_state.special_effects[data.attacker_id].quick_attack_ready = true;
  }
}

function move_reduction_check(data) {
  if (data.hasOwnProperty("move_reduction")) {
    character_state.move_action[data.target_id] = character_state.move_action[data.target_id] - data.move_reduction;
  }
}

function receiveAttack_construct_cover_string(cover_level) {
  if (cover_level > 0) {
    var cover_string = "Уровень укрытия: " + cover_level
  } else {
    var cover_string = ""
  }
  return cover_string;
}

function receiveAttack_outcome_switch(attacker_id, target_id, outcome, attack_roll, evade_roll, damage_roll, attack_type, cover_string) {
  var attacker = character_detailed_info[attacker_id]
  var target = character_detailed_info[target_id]

  switch (outcome) {
    case "KD_block":
      var message = attacker.name + " атакует " + target.name + " (" + attack_roll + "), но не пробивает броню. " + cover_string
      pushToList(message)
      break;
    case "evaded":
      var message = attacker.name + " атакует " + target.name + " (" + attack_roll + "), однако " + target.name + " удалось увернуться (" + evade_roll + "). " + cover_string
      pushToList(message)
      if (target.special_type != 'rogue') {
        character_state.can_evade[target_id] = 0
      }
      break;
    case "damage_without_evasion":
      var message = attacker.name + " успешно атакует " + target.name + " (" + attack_roll + "), который больше не может уворачиваться. Атака наносит " + damage_roll + " урона. " + cover_string
      pushToList(message)
      do_damage(target_id, damage_roll)
      melee_penalty(attack_type, target_id);
      break;
    case "damage_after_evasion":
      var message = attacker.name + " успешно атакует " + target.name + " (" + attack_roll + "), который не смог увернуться (" + evade_roll + "). Атака наносит " + damage_roll + " урона. " + cover_string
      pushToList(message)
      do_damage(target_id, damage_roll)
      character_state.can_evade[target_id] = 0
      melee_penalty(attack_type, target_id);
      break;
    case "full_crit":
      var message = attacker.name + " критически атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + damage_roll + " урона. " + cover_string
      pushToList(message)
      do_damage(target_id, damage_roll)
      character_state.can_evade[target_id] = 0
      melee_penalty(attack_type, target_id);
      break;
    case "full_cover":
      var message = attacker.name + " пытался атаковать " + target.name + " но тот находится в полном укрытии."
      pushToList(message)
      break;
    default:
      console.log("fucked up resolving damage")
      break;
  }
}

function sendAttack_cumulative_attack_roll(toSend, weapon_type, attack_roll, user_character_number, cover_modifier_bonus, bonus_attack) {
  var attacking_character = character_detailed_info[user_character_number];
  if (weapon_type == "ranged") {
    var cumulative_attack_roll = attack_roll + parseInt(attacking_character.intelligence)
    if (character_state.special_effects[user_character_number].hasOwnProperty("aim")) {// Прицел даблит бонус попадания
      cumulative_attack_roll = cumulative_attack_roll + parseInt(attacking_character.intelligence);
      toSend.aim_over = 1;
    }
  } else if (weapon_type == "melee") {
    var cumulative_attack_roll = attack_roll + parseInt(attacking_character.strength)
  } else if (weapon_type == "energy") {
    var cumulative_attack_roll = attack_roll + 2*parseInt(attacking_character.intelligence)
  } else if (weapon_type == "throwing") {
    var cumulative_attack_roll = attack_roll + parseInt(attacking_character.agility)
  }

  var attack_bonus = character_state.attack_bonus[user_character_number]
  var universal_bonus = character_state.universal_bonus[user_character_number]

  cumulative_attack_roll = cumulative_attack_roll + attack_bonus + universal_bonus + cover_modifier_bonus + bonus_attack;
  toSend.attack_roll = cumulative_attack_roll;
  return toSend;
}

function sendAttack_quick_attack_check(toSend, weapon) {
  if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
    toSend.quick_attack_ready = true;
  }
  return toSend;
}

function sendAttack_invisibility_over_check(toSend, user_character_number, weapon_type) {
  if (character_state.invisibility[user_character_number] != "all" && weapon_type != "throwing") {
    toSend.user_invisibility_ended = 1
  }
  return toSend;
}

function sendAttack_drobovik_slow_check(toSend, target_character_number, weapon) {
  var target_character = character_detailed_info[target_character_number];
  if (toSend.hasOwnProperty("damage_roll") && weapon.hasOwnProperty("subtype") && weapon.subtype == "drobovik") {
    var slow_scale = parseFloat(weapon.slow_scale);
    var full_hp = HP_values[parseInt(target_character.stamina)]
    var current_moves = character_state.move_action[target_character_number]
    var fraction = parseFloat(toSend.damage_roll)/parseFloat(full_hp)
    var move_reduction = current_moves * fraction * slow_scale;
    toSend.move_reduction = move_reduction;
  }
  return toSend;
}

// Skills!

function use_skill(skill_index, character_number, position, cell) {
  skill_index = parseInt(skill_index)
  switch(skill_index) {
    case 0: //Рывок
      if (character_state.bonus_action[character_number] > 0) {
        if ((!character_state.special_effects[character_number].hasOwnProperty("charge_user"))) {
          var toSend = {};
          toSend.command = 'skill';
          toSend.room_number = my_room;
          toSend.skill_index = skill_index
          toSend.user_index = character_number
          socket.sendMessage(toSend);
        } else {
          alert("Вы уже совершили максимальное число рывков в этот ход")
        }
      } else {
        alert("Не хватает действий!")
      }
      break;
    case 1: //Прилив Адреналина
      if (character_state.special_effects[character_number].hasOwnProperty("adrenaline_user")) {
        alert("Умение все еще на кулдауне")
      } else {
        choose_character_skill(skill_index, character_number, position, cell)
      }
      break;
    case 2: // Подрезать сухожилия
    if (!character_state.special_effects[character_number].hasOwnProperty("cut_limb_user")) {
      if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell)
      } else {
        alert("Не хватает действий!")
      }
    } else {
      alert("Умение все еще на кулдауне!")
    }
    break;

    case 3: // Слабое место
    if (character_state.bonus_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 4: // Лечение
    if (character_state.main_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 5: // Большой брат
    if (character_state.bonus_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 6: // Поднять щиты
    if (character_state.main_action[character_number] > 0 || character_state.special_effects[character_number].hasOwnProperty("shield_up")) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.room_number = my_room;
      toSend.skill_index = skill_index
      toSend.user_index = character_number

      if (character_state.special_effects[character_number].hasOwnProperty("shield_up")) {
        toSend.outcome = "shield_down"
      } else {
        toSend.outcome = "shield_up"
      }
      socket.sendMessage(toSend);
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 7: // пожирание сущности
    if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
      choose_character_skill(skill_index, character_number, position, cell)
    } else {
      alert("Не хватает действий!")
    }
    break;

    case 8: // узнать биопул
      if (character_state.special_effects[character_number].hasOwnProperty("biopool")) {
        alert("Накопленный биопул: " + character_state.special_effects[character_number].biopool)
      } else {
        alert("Накопленный биопул отсутствует")
      }
      break;

    case 9: // безупречное восстановление
      if (character_state.bonus_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell)
      } else {
        alert("Не хватает действий!")
      }
      break;

    case 10: // обычное в бонусное
        if (character_state.main_action[character_number] > 0) {
          var toSend = {};
          toSend.command = 'skill';
          toSend.room_number = my_room;
          toSend.skill_index = skill_index
          toSend.user_index = character_number
          socket.sendMessage(toSend);
        } else {
          alert("Не хватает основных действий, чтобы превратить в бонусные!")
        }
      break;

    case 11: // отдых
          if (character_state.has_moved[character_number] == 0) {
            var new_stamina = Math.min(character_state.stamina[character_number] + rest_stamina_gain, stamina_values[character_detailed_info[character_number].stamina])
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index
            toSend.new_stamina = new_stamina
            toSend.user_index = character_number
            socket.sendMessage(toSend);
          } else {
            alert("Вы уже совершали действия на этом ходу, так что не можете отдохнуть")
          }
        break;

    case 12: // газовая граната
          if (!character_state.special_effects[character_number].hasOwnProperty("gas_bomb_user")) {
            if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
              choose_character_skill(skill_index, character_number, position, cell)
            } else {
              alert("Не хватает действий!")
            }
          } else {
            alert("У гранаты кулдаун (газ эээ заваривается, хз)")
          }
          break;
    case 13: // светошумовая граната
          if (!character_state.special_effects[character_number].hasOwnProperty("light_sound_bomb_user")) {
              if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
                choose_character_skill(skill_index, character_number, position, cell)
              } else {
                alert("Не хватает действий!")
              }
            } else {
              alert("Граната еще не готова")
            }
          break;
    case 14: // Шоковый импульс
      if (character_state.main_action[character_number] > 0) {
        choose_character_skill(skill_index, character_number, position, cell)
      } else {
        alert("Не хватает действий!")
      }
        break;
    case 15: // Пыщ-пыщ-го
      if (!character_state.special_effects[character_number].hasOwnProperty("pich_pich_user")) {
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
      } else {
        alert("Пыщ пыщ еще на перезарядке!")
      }
        break;

    case 16: // Силовое поле
        if (!character_state.special_effects[character_number].hasOwnProperty("force_field_user")) {
          if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Не хватает действий!")
          }
        } else {
          alert("Генератор силового поля еще не зарядился!")
        }
        break;

    case 17: // Инвиз
          if (character_state.bonus_action[character_number] > 0) {
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index;
            toSend.user_index = character_number;
            toSend.username = my_name;
            toSend.position = position;
            socket.sendMessage(toSend);
          } else {
            alert("Не хватает действий!")
          }
        break;
    case 18: // Боевая универсальность
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index;
            toSend.user_index = character_number;
            socket.sendMessage(toSend);
            break;

    case 19: // Лаки шот
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
        break;

    case 20: // Лотерейный выстрел
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
        break;

    case 21: //Прилив действий
      if (character_state.special_effects[character_number].hasOwnProperty("action_splash")) {
        alert("Умение все еще на кулдауне")
      } else {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index
        toSend.user_index = character_number
        toSend.extra_actions = character_state.bonus_action[character_number]
        socket.sendMessage(toSend);
      }
      break;


    case 22: // град ударов
        if (character_state.main_action[character_number] > 1) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Для града ударов требуется больше 1 основного действия!")
        }
      break;

    case 23: //Адреналиновый потоп
        if (character_state.special_effects[character_number].hasOwnProperty("poisonous_adrenaline_user")) {
          alert("Умение все еще на кулдауне")
        } else {
          choose_character_skill(skill_index, character_number, position, cell)
        }
        break;

    case 24: // кислотная граната
          if (!character_state.special_effects[character_number].hasOwnProperty("acid_bomb_user")) {
            if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
              choose_character_skill(skill_index, character_number, position, cell)
            } else {
              alert("Не хватает действий!")
            }
          } else {
            alert("У гранаты кулдаун (кислота окисляется)")
          }
          break;

    case 25: // Заминировать
          if (character_state.bonus_action[character_number] > 0) {
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index
            toSend.user_index = character_number
            toSend.player_name = my_name
            toSend.position = position
            socket.sendMessage(toSend);
          } else {
            alert("Не хватает действий!")
          }
          break;

    case 26: // Взаимодействовать
          if (character_state.bonus_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Это умение требует 1 бонусное действие!")
          }
          break;

    case 27: // Никотиновый удар
          if (!character_state.special_effects[character_number].hasOwnProperty("tobacco_strike")) {
            var toSend = {};
            toSend.command = 'skill';
            toSend.room_number = my_room;
            toSend.skill_index = skill_index
            toSend.user_index = character_number
            socket.sendMessage(toSend);
          } else {
            alert("Нельзя затягиваться так часто! У вас зависимость")
          }
          break;
    case 28: // Крученые пули
          if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Не хватает действий!")
          }
        break;
    case 29: // Прицелиться
          if (character_state.bonus_action[character_number] > 0) {
            if (!character_state.special_effects[character_number].hasOwnProperty("aim")) {
              var toSend = {};
              toSend.command = 'skill';
              toSend.room_number = my_room;
              toSend.skill_index = skill_index
              toSend.user_index = character_number
              socket.sendMessage(toSend);
            } else {
              alert("Вы уже прицелились - пора шмалять")
            }
          } else {
              alert("Не хватает действий!")
          }
          break;

    case 30: // быстрая атака
        if (character_state.bonus_action[character_number] > 0) {
          if (character_state.special_effects[character_number].hasOwnProperty("quick_attack_ready")) {
            choose_character_skill(skill_index, character_number, position, cell);
          } else {
            alert("Сперва нужно совершить основную атаку!")
          }
        } else {
          alert("Не хватает действий!")
        }
        break;

    case 31: // служба спасения
          if (character_state.bonus_action[character_number] > 1) {// два бонусных
            if (!character_state.special_effects[character_number].hasOwnProperty("safety_service_user")) {
              choose_character_skill(skill_index, character_number, position, cell);
            } else {
              alert("Умение все еще на кулдауне")
            }
          } else {
            alert("Не хватает действий!")
          }
          break;

    case 32: // Кальингаллятор
        if (!character_state.special_effects[character_number].hasOwnProperty("calingalator_user")) {
          if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Не хватает действий!")
          }
        } else {
          alert("Чрезмерное калингалирование вредит вашему здоровью! (кулдаун)")
        }
        break;

    case 33: // Бафф Бельвет
        if (character_state.main_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell);
        } else {
            alert("Не хватает действий!")
        }
        break;

    case 34: // Трансформация Бельвет
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

    case 35: // хук
        if (!character_state.special_effects[character_number].hasOwnProperty("hook_user")) {
          if (character_state.bonus_action[character_number] > 0) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Не хватает действий!")
          }
        } else {
          alert("Умение все еще на кулдауне!")
        }
        break;

    case 36: // карающий удар
      if (!character_state.special_effects[character_number].hasOwnProperty("punishing_strike_user")) {
        if (character_state.bonus_action[character_number] > 0 && character_state.main_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
      } else {
        alert("Умение все еще на кулдауне!")
      }
      break;

    case 37: // прыжок
      if (!character_state.special_effects[character_number].hasOwnProperty("jump_user")) {
        if (character_state.bonus_action[character_number] > 0) {
          if (!character_state.special_effects[character_number].hasOwnProperty("carry_user")) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Вы не можете прыгать с таким грузом на руках!");
          }
        } else {
          alert("Не хватает действий!")
        }
      } else {
        alert("Вы можете совершить лишь один прыжок за ход!")
      }
      break;

    case 38: // Перенести
      if (! (character_state.special_effects[character_number].hasOwnProperty("carry_user") || character_state.special_effects[character_number].hasOwnProperty("carry_target"))) {
        if (character_state.bonus_action[character_number] > 0) {
          choose_character_skill(skill_index, character_number, position, cell)
        } else {
          alert("Не хватает действий!")
        }
      } else {
        var toSend = {};
        toSend.command = 'skill';
        toSend.room_number = my_room;
        toSend.skill_index = skill_index
        toSend.carry_interrupt = true;
        if (character_state.special_effects[character_number].hasOwnProperty("carry_user")) {
          toSend.carry_user_index = character_number
          toSend.carry_target_index = character_state.special_effects[character_number].carry_user.carry_target_index;
        } else if (character_state.special_effects[character_number].hasOwnProperty("carry_target")) {
          toSend.carry_user_index = character_state.special_effects[character_number].carry_target.carry_user_index;
          toSend.carry_target_index = character_number;
        }
        socket.sendMessage(toSend);
      }
      break;

    case 39: // пас
      if (character_state.main_action[character_number] > 0) {
        if (character_state.special_effects[character_number].hasOwnProperty("carry_user") ) {
          var ball_index = character_state.special_effects[character_number].carry_user.carry_target_index;
          var ball = character_detailed_info[ball_index];
          if (ball.special_type = "ball") {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Пасовать можно только мяч... (сюрприз-сюрприз)");
          }
        } else {
          alert("Что вы собирались пасовать..?");
        }
      } else {
        alert("Не хватает действий!")
      }
      break;

    case 40: // belvet jump
      if (!character_state.special_effects[character_number].hasOwnProperty("belvet_jump")) {
        if (character_state.main_action[character_number] > 0 && character_state.bonus_action[character_number] > 0) {
          if (!character_state.special_effects[character_number].hasOwnProperty("carry_user")) {
            choose_character_skill(skill_index, character_number, position, cell)
          } else {
            alert("Вы не можете прыгать с таким грузом на руках!");
          }
        } else {
          alert("Не хватает действий!")
        }
      } else {
        alert("Умение на кулдауне")
      }
      break;
    default:
      alert("Не знаем это умение")
  }
}

function perform_skill(index, cell) {
  switch(character_chosen.skill_id) {
    case 1:
      adrenaline(index, cell)
      break;
    case 2: // Подрезать сухожилия
      cut_limbs(index, cell)
      break;
    case 3: // Слабое место
      weak_spot(index, cell)
      break;
    case 4: // Лечение
      heal(index, cell)
      break;
    case 5: // Большой брат
      big_bro(index, cell)
      break;
    case 7: // пожирание
      devour(index, cell)
      break;
    case 9:
      absolute_recovery(index, cell)
      break;
    case 12:
      gas_bomb(index, cell)
      break;
    case 13:
      light_sound_bomb(index, cell)
      break;
    case 14:
      shock_wave(index, cell)
      break;
    case 15:
      pich_pich_go(index, cell)
      break;
    case 16:
      force_field(index, cell)
      break;

    case 19:
      lucky_shot(index, cell)
      break;

    case 20:
      lottery_shot(index, cell)
      break;

    case 22:
      punch_rainfall(index, cell)
      break;

    case 23:
      poisonous_adrenaline(index, cell)
      break;

    case 24:
      acid_bomb(index, cell)
      break;

    case 26:
      interact(index, cell)
      break;
    case 28:
      curved_bullets(index, cell)
      break;
    case 30:
      quick_attack(index, cell)
      break;
    case 31:
      safety_service(index, cell)
      break;
    case 32:
      calingalator(index, cell)
      break;
    case 33:
      belvet_buff(index, cell)
      break;

    case 35:
      hook(index, cell)
      break;

    case 36:
      punishing_strike(index, cell);
      break;

    case 37:
      jump(index, cell);
      break;

    case 38:
      carry(index, cell);
      break;

    case 39:
      pass_the_ball(index, cell);
      break;

    case 40:
      belvet_jump(index, cell);
      break;

    default:
      alert("Unknown targeted skill")
  }
  stop_skill()
}

function choose_character_skill(skill_index, character_number, position, cell) {
  character_chosen.in_process = 3
  character_chosen.skill_id = skill_index
  character_chosen.char_id = character_number
  character_chosen.char_position = position
  cell.src = "./images/Chidori.webp";
}

function find_pass_range(user_character_number) {
  var character = character_detailed_info[user_character_number];
  var strength = parseInt(character.strength);
  return 2*strength;
}

function pass_the_ball(index, cell) {
  var user_character_number = character_chosen.char_id;
  var user_position = character_chosen.char_position;
  var pass_range = find_pass_range(user_character_number);
  var ball_index = character_state.special_effects[user_character_number].carry_user.carry_target_index;
  if (isInRange(index, user_position, pass_range)) {
    var toSend = {}
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.landing_position = index;
    toSend.ball_index = ball_index
    toSend.ball_position = character_state.position[ball_index];
    toSend.passer_index = user_character_number;
    socket.sendMessage(toSend);
  } else {
    alert("Не хватит силы для такого паса")
  }
}

function belvet_jump(to_index, to_cell) {
  var chosen_character_index = character_chosen.char_id;
  var chosen_index = character_state.position[chosen_character_index];

  var distance = findDistance(to_index, chosen_index)
  var max_distance = belvet_jump_base_distance + findJumpDistance(chosen_character_index);

  if (distance <= max_distance) {
    var accumulated_cover = get_accumulated_cover(chosen_index, to_index);

    if (accumulated_cover < jump_cover_impossible_threshold) {
      var toSend = {};
      toSend.room_number = my_room;
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id;
      toSend.user_index = chosen_character_index;
      toSend.movement_object = constructMoveSendObject(chosen_index, to_index, chosen_character_index, distance)
      toSend.damage_object_array = belvet_jump_damage_object(chosen_index, to_index, chosen_character_index);

      clear_containers();
      socket.sendMessage(toSend);
    } else {
      alert("Слишком много препятствий чтобы их перепрыгнуть");
    }
  } else {
    alert("Вы Бельвет, а не катапульта");
  }
}

function belvet_jump_damage_object(from_index, to_index, character_number) {
  var damage_object_array = [];
  var candidate_cells = cells_on_line(from_index, to_index, game_state.size);
  var cover_modifier = cover_mod(0);
  var weapon = weapon_detailed_info[belvet_jump_weapon_id];
  for (let i = 0; i < candidate_cells.length - 1; i++) {
    let cell_index = candidate_cells[i];
    if (game_state.board_state[cell_index] > 0) {// is character
      var target_character_number = game_state.board_state[cell_index];
      var damage_object = attack_hitting_template({}, weapon, character_number, target_character_number, cover_modifier, 0);
      damage_object.target_id = target_character_number;
      damage_object.attack_type = weapon.type;
      damage_object_array.push(damage_object);
    }
  }
  return damage_object_array;
}

function carry(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, carry_range)) {
    var target_character_number = game_state.board_state[index]
    if (! (character_state.special_effects[target_character_number].hasOwnProperty("carry_target") || character_state.special_effects[target_character_number].hasOwnProperty("carry_user"))) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_index = target_character_number
      toSend.carry_distance_modifier = carry_distance_modifier;
      socket.sendMessage(toSend);
    } else {
      alert("Эта цель уже участвует в тащинге (цель тащат/тащит)");
    }
  } else {
    alert("Цель слишком далеко чтобы подхватить")
  }
}

function carry_interruption(carry_user_index, carry_target_index) {
  var carry_user = character_detailed_info[carry_user_index]
  var carry_target = character_detailed_info[carry_target_index]
  var message = carry_user.name + " перестает тащить " + carry_target.name;
  pushToList(message)
  delete character_state.special_effects[carry_user_index].carry_user;
  delete character_state.special_effects[carry_target_index].carry_target;
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
      var vector = {}
      vector.x = (target_coord.x - user_coord.x);
      vector.y = (target_coord.y - user_coord.y);
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
      var toSend = {}
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number
      var new_position = coord_to_index(updated_coord, game_state.size)
      if (game_state.board_state[new_position] == 0) {
        toSend.hook_possible = true;
        toSend.old_position = target_position;
        toSend.new_position = new_position;
      } else {
        toSend.hook_possible = false;
      }
      socket.sendMessage(toSend);
    } else {
      alert("Ваши цели за пределами моего понимания, поэтому нет");
    }
  } else {
    alert("Максимальный радиус хука - 3 клетки");
  }

}

function belvet_transformation(user_index, skill_index) {
  var user =  character_detailed_info[user_index];
  var targets_set = character_state.special_effects[user_index].belvet_buff_user.targets_set;
  var total_upgrade = 0;
  var rolled_buffs_targets = [];
  var rolled_buffs_outcomes = [];
  for (var target_id of targets_set) {
    var target = character_detailed_info[target_id];
    var target_stacks = character_state.special_effects[target_id].belvet_buff_stacks.stacks;
    var buffs_array = [];
    var rolled_array = [0,0,0,0,0];
    buffs_array.push(target.strength);
    buffs_array.push(target.stamina);
    buffs_array.push(target.agility);
    buffs_array.push(target.intelligence);
    buffs_array.push(character_state.KD_points[target_id] - 8);
    var total_roll = target.strength + target.stamina + target.agility + target.intelligence + character_state.KD_points[target_id] - 8;
    while (target_stacks > 0 && total_roll > 0) {
      var roll = roll_x(total_roll);
      if (roll <= buffs_array[0]) {// strength
        buffs_array[0] -= 1;
        rolled_array[0] += 1;
      } else if (roll <= buffs_array[0] + buffs_array[1]) {//stamina
        buffs_array[1] -= 1;
        rolled_array[1] += 1;
      } else if (roll <= buffs_array[0] + buffs_array[1] + buffs_array[2]) {// agility
        buffs_array[2] -= 1;
        rolled_array[2] += 1;
      } else if (roll <= buffs_array[0] + buffs_array[1] + buffs_array[2] + buffs_array[3]) {// intelligence
        buffs_array[3] -= 1;
        rolled_array[3] += 1;
      } else {// KD
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
  var toSend = {};
  toSend.command = 'skill';
  toSend.room_number = my_room;
  toSend.skill_index = skill_index
  toSend.user_index = user_index
  toSend.total_upgrade = total_upgrade;
  toSend.rolled_buffs_targets = rolled_buffs_targets
  toSend.rolled_buffs_outcomes = rolled_buffs_outcomes;
  socket.sendMessage(toSend);

}

function safety_service(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, safety_service_range)) {
    var target_character_number = game_state.board_state[index]
    if (!character_state.special_effects[target_character_number].hasOwnProperty("safety_service_target")) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number
      socket.sendMessage(toSend);
    } else {
      alert("Эта цель уже под защитой")
    }
  } else {
    alert("Вы не можете защищать с такого расстояния")
  }
}

function belvet_buff(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, belvet_buff_range)) {
    var target_character_number = game_state.board_state[index]
    if (!character_state.special_effects[target_character_number].hasOwnProperty("belvet_buff_target")) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number
      socket.sendMessage(toSend);
    } else {
      alert("На этом персонаже уже есть активный бафф этого типа (увы)")
    }
  } else {
    alert("Вы не можете баффать (хе-хе) с такого расстояния")
  }
}

function weak_spot(index, cell) {
  var target_character_number = game_state.board_state[index]
  var user_character_number = character_chosen.char_id
  var user_position = character_state.position[user_character_number];
  var attacking_character = character_detailed_info[user_character_number]

  if (isInRange(user_position, index, weak_spot_range)) {
    var accumulated_cover = get_accumulated_cover(user_position, index);

    if (accumulated_cover < weak_spot_cover_impossible_threshold) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number

      var int_check = roll_x(20) + parseInt(attacking_character.intelligence) + character_state.universal_bonus[user_character_number]
      if (int_check >= weak_spot_threshold) {
        toSend.outcome = "success"
      } else {
        toSend.outcome = "fail"
      }

      socket.sendMessage(toSend);
    } else {
      alert('Слишком много препятствий закрывают обзор');
    }
  } else {
    alert('Слишком далеко, чтобы хорошо рассмотреть цель');
  }
}

function heal(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, heal_range)) {

  var target_character_number = game_state.board_state[index]
  var healer_character = character_detailed_info[user_character_number]
  var target_character = character_detailed_info[target_character_number]

  var target_hp = character_state.HP[target_character_number]
  var target_full_hp = HP_values[target_character.stamina]
  var ratio = parseFloat(target_hp)/parseFloat(target_full_hp)

  var heal_roll = roll_x(20) + parseInt(healer_character.intelligence) + character_state.universal_bonus[user_character_number]
  if (healer_character.special_type == "med") {
    heal_roll = heal_roll + parseInt(healer_character.intelligence)
  }
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
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

  } else {
    alert("Нужно подойти ближе к цели чтобы вылечить")
  }
}

function big_bro(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, big_bro_range)) {
  var target_character_number = game_state.board_state[index]

  var shield_KD = parseInt(character_state.KD_points[user_character_number]) + parseInt(character_state.bonus_KD[user_character_number])
  var target_KD = parseInt(character_state.KD_points[target_character_number]) + parseInt(character_state.bonus_KD[target_character_number])

  var bonus_KD = Math.max(shield_KD -  target_KD, 0)

  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.target_id = target_character_number
  toSend.bonus_KD = bonus_KD
  socket.sendMessage(toSend);
} else {
  alert("Большой брат не достает до малого!")
}
}

function punishing_strike(index, cell) {
  var target_character_number = game_state.board_state[index]
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]];
  var attacking_character = character_detailed_info[user_character_number]
  var accumulated_cover = get_accumulated_cover(index, user_position)
  var bonus_attack = 0;
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover);
  if (toSend == null) {
    alert("Далековато")
  } else {
    if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
      var damage_roll = toSend.damage_roll
      var multiplyer = 1.0 - punishing_strike_multiplyer*(character_state.defensive_advantage[target_character_number]);
      toSend.damage_roll *= multiplyer;
    } else {
      toSend.skill_outcome = "fail"
    }
    socket.sendMessage(toSend);
  }
}

function cut_limbs(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number]
    var bonus_attack = parseInt(attacking_character.agility)

    var accumulated_cover = get_accumulated_cover(index, user_position)
    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover)
    if (toSend == null) {
      alert("Далековато")
    } else {
      if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
        var damage_roll = toSend.damage_roll
        var flat_damage = damage_roll - strength_damage_map[parseInt(attacking_character.strength)] - character_state.damage_bonus[user_character_number]
        var full_damage = weapon.damage[1] * weapon.damage[0]
        if (flat_damage > full_damage/3) {
          toSend.skill_outcome = "success"
        }  else {
          toSend.skill_outcome = "fail"
        }
      } else {
        toSend.skill_outcome = "fail"
      }
      socket.sendMessage(toSend);
    }

  } else {
    alert("Вы не можете подрезать сухожилья этим оружием")
  }


}

function quick_attack(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  if (weapon.hasOwnProperty("subtype") && weapon.subtype == "PP") {
    var attacking_character = character_detailed_info[user_character_number]
    var bonus_attack = 0;

    var accumulated_cover = get_accumulated_cover(index, user_position)
    var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover)
    if (toSend == null) {
      alert("Далековато")
    } else {
      toSend.damage_roll = toSend.damage_roll/2; // быстрая атака наносит половину урона
      socket.sendMessage(toSend);
    }

  } else {
    alert("Быструю атаку можно совершить только пистолетом-пулеметом")
  }
}

function punch_rainfall(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  if (weapon.type == "melee") {
    var attacking_character = character_detailed_info[user_character_number]
    var target_char_id = game_state.board_state[index]
    var target_character = character_detailed_info[target_char_id]
    var bonus_attack = 0;

    var total_damage = 0;
    var attacks_successful = 0;
    var accumulated_cover = get_accumulated_cover(index, user_position);
    for (let i = 0; i < character_state.main_action[user_character_number]; i++) {
      var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover)
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

    var multiplyer = 1.0 + parseFloat(attacks_successful - 1)/2.0
    var message = "Множитель града был: " + multiplyer
    console.log(message)
    var final_damage = parseInt(parseFloat(total_damage)*multiplyer)

    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.target_id = target_char_id
    toSend.total_attacks = character_state.main_action[user_character_number]
    toSend.successfull_attacks = attacks_successful
    toSend.damage = final_damage
    socket.sendMessage(toSend);

  } else {
    alert("Град ударов можно соврешить только рукопашным оружием!")
  }
}

function shock_wave(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  var attacking_character = character_detailed_info[user_character_number]
  var bonus_attack = 0;

  var accumulated_cover = get_accumulated_cover(index, user_position);
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover)
  if (toSend == null) {
    alert("Далековато")
  } else {
    if (toSend.outcome == "damage_after_evasion" || toSend.outcome == "damage_without_evasion" || toSend.outcome == "full_crit") {
      toSend.skill_outcome = "success"
    } else {
      toSend.skill_outcome = "fail"
    }
    socket.sendMessage(toSend);
  }
}

function devour(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index]
    var stacks = 0
    if (character_state.special_effects[target_character_number].hasOwnProperty("Markus_stacks")) {
      stacks = character_state.special_effects[target_character_number].Markus_stacks
    }
    var damage = stacks*5 + roll_x(10)
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.target_id = target_character_number
    toSend.damage = damage
    socket.sendMessage(toSend);
  } else {
    alert("Далековато")
  }
}

function absolute_recovery(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  if (isInRange(index, user_position, 1)) {
    var target_character_number = game_state.board_state[index]
    var heal_amount = 0

    var damage_field = document.getElementById("damage_field");
    if (!(damage_field.value === "")) {
      heal_amount = parseInt(damage_field.value);
    }

    var biopool = 0
    if (character_state.special_effects[user_character_number].hasOwnProperty("biopool")) {
      biopool = character_state.special_effects[user_character_number].biopool
    }

    if (heal_amount > 0 && biopool >= heal_amount) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.target_id = target_character_number
      toSend.heal_amount = heal_amount
      socket.sendMessage(toSend);
    } else {
      alert("Невозможное значение лечения")
    }
  } else {
    alert("Далековато")
  }
}

function gas_bomb(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var character = character_detailed_info[user_character_number]
  var throw_range = findThrowRange(character)
  if (isInRange(index, user_position, throw_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.position = index
    toSend.threshold = compute_gas_bomb_threshold(character)
    socket.sendMessage(toSend);

    if (game_state.board_state[index] == 0) {// анимация только в пустую клетку
      add_obstacle_command(index, gas_bomb_obstacle)
    }
  } else {
    alert("Мало каши ели для такого броска")
  }
}

function calingalator(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var character = character_detailed_info[user_character_number]
  if (game_state.board_state[index] == 0) {// устанавливается только в пустую клетку
    if (isInRange(index, user_position, calingalator_range)) {
      var toSend = {};
      toSend.command = 'skill';
      toSend.skill_index = character_chosen.skill_id
      toSend.room_number = my_room;
      toSend.user_index = user_character_number
      toSend.position = index
      socket.sendMessage(toSend);

      add_obstacle_command(index, calingalator_obstacle)

    } else {
      alert("Кальингаллятор можно установить лишь в пределах 1.5 клетки от вас")
    }
  } else {
    alert("Кальингаллятор можно установить лишь в пустую клетку")
  }
}

function diffuse_landmine(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var character = character_detailed_info[user_character_number]
  if (isInRange(index, user_position, landmine_diffusion_radius)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.position = index
    toSend.interaction_type = 'diffuse_landmine';

    if (game_state.landmines.positions.includes(index)) {
      var roll = roll_x(20) + parseInt(character.intelligence)
      if (roll > landmine_diffuse_threshold) {
        toSend.outcome = "success"
      } else {
        toSend.outcome = "fail"
      }
    } else {
      toSend.outcome = "empty";
    }
    socket.sendMessage(toSend);
  } else {
    alert("Слишком далеко для взаимодействия")
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
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.position = index
    toSend.interaction_type = 'hackable_computer';

    if (hack_stage < 3 && hack_fails < 3) {// there is point to roll
      var hack_roll = roll_x(20);
      if (hack_roll == 20) {// crit
        toSend.outcome = 'hacked';
      } else if (hack_roll == 1) {// anticrit
        toSend.outcome = 'failed';
      } else {// normal
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
    } else if (hack_stage >= 3) {// already hacked
      toSend.outcome = 'already_hacked';
    } else {
      toSend.outcome = 'already_failed';
    }
    socket.sendMessage(toSend);
  } else {
    alert("Взлом компьютера должен осуществляться с расстояния 1 клетки");
  }
}

function interact(index, cell) {
  var object_number = game_state.board_state[index];
  if (object_number == 0) {// empty, so diffuse landmine mod
    diffuse_landmine(index, cell);
  } else if (object_number < 0) {// obstacle interaction
    var obstacle_number = Math.abs(object_number);
    var obstacle = obstacle_detailed_info[obstacle_number];
    if (obstacle.hasOwnProperty("hackable_computer")) {
      computer_hacking(index, obstacle_number);
    }
  }

}

function acid_bomb(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var character = character_detailed_info[user_character_number]
  var throw_range = findThrowRange(character)
  if (isInRange(index, user_position, throw_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.position = index
    socket.sendMessage(toSend);
  } else {
    alert("Мало каши ели для такого броска")
  }
}

function light_sound_bomb(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  if (isInRange(index, user_position, light_sound_bomb_range)) {
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.position = index

  var character_list = []
  var outcome_list = []

  var radius = light_sound_bomb_radius

  var candidate_cells = index_in_radius(index, radius)
  console.log(candidate_cells)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number]
      if (character.special_type !== "drone") {
        character_list.push(target_character_number)
        var save_roll = roll_x(20) + character_state.universal_bonus[target_character_number] + parseInt(character.intelligence)
        if (save_roll > light_sound_bomb_threshold) {
          outcome_list.push(0)
        } else {
          outcome_list.push(1)
        }
      }
    }
  }
  toSend.character_list = character_list
  toSend.outcome_list = outcome_list

  socket.sendMessage(toSend);
} else {
  alert("Дрон не докинет")
}
}

function force_field(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  if (isInRange(index, user_position, force_field_range)) {
  var toSend = {};
  toSend.command = 'skill';
  toSend.skill_index = character_chosen.skill_id
  toSend.room_number = my_room;
  toSend.user_index = user_character_number
  toSend.position = index

  var user = character_detailed_info[user_character_number]

  var shield = Math.ceil(parseFloat(HP_values[user.stamina])/2)
  toSend.shield = shield

  var character_list = []

  var radius = force_field_radius

  var candidate_cells = index_in_radius(index, radius)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе щита
        character_list.push(target_character_number)
    }
  }
  toSend.cells_protected = candidate_cells
  toSend.character_list = character_list
  socket.sendMessage(toSend);

  add_obstacle_command(index, force_field_obstacle)
} else {
  alert("Генератор должен быть установлен поближе")
}
}

function adrenaline(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  var target_number = game_state.board_state[index]
  var adrenaline_range = 1
  if (isInRange(index, user_position, adrenaline_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id
    toSend.user_index = user_character_number
    toSend.target_index = target_number
    var extra_actions = roll_x(4)
    var minus_actions = roll_x(4)
    toSend.extra_actions = extra_actions
    toSend.minus_actions = minus_actions
    socket.sendMessage(toSend);
  } else {
    alert("Далековато")
  }
}

function poisonous_adrenaline(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id

  var target_number = game_state.board_state[index]
  if (isInRange(index, user_position, poisonous_adrenaline_range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id
    toSend.user_index = user_character_number
    toSend.target_index = target_number
    var extra_actions = []
    for (let i = 0; i < poisonous_adrenaline_duration; i++) {
      extra_actions.push(roll_x(4))
    }
    toSend.extra_actions = extra_actions
    socket.sendMessage(toSend);
  } else {
    alert("Радиус адреналина 1 клетка!")
  }
}

function pich_pich_go(index, cell) {
  var user_character_number = character_chosen.char_id

  var user = character_detailed_info[user_character_number]
  var target_number = game_state.board_state[index]
  var target = character_detailed_info[target_number]
  if (target.special_type == "drone") {
    var toSend = {};
    toSend.command = 'skill';
    toSend.room_number = my_room;
    toSend.skill_index = character_chosen.skill_id
    toSend.user_index = user_character_number
    toSend.target_index = target_number
    var extra_actions = Math.ceil(parseFloat(user.intelligence)/2)
    toSend.extra_actions = extra_actions
    socket.sendMessage(toSend);
  } else {
    alert("Вы не можете пыщ-пыщ кого попало!")
  }
}

function lucky_shot(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var target_character_number = game_state.board_state[index]
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]

  if (isInRange(index, user_position, weapon.range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.target_id = target_character_number
    toSend.roll = roll_x(10)
    if (toSend.roll == 7) {
      toSend.damage = roll_x(7)
    }
    socket.sendMessage(toSend);

  } else {
    alert("Далековато")
  }
}

function lottery_shot(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var target_character_number = game_state.board_state[index]
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]

  if (isInRange(index, user_position, weapon.range)) {
    var toSend = {};
    toSend.command = 'skill';
    toSend.skill_index = character_chosen.skill_id
    toSend.room_number = my_room;
    toSend.user_index = user_character_number
    toSend.target_id = target_character_number
    toSend.roll = roll_x(100)
    if (toSend.roll == 7) {
      var damage = 0
      for (let i = 0; i < 7; i++) {
        damage = damage + roll_x(7)
      }
      toSend.damage = damage
    } else if (toSend.roll == 77) {
      var damage = 0
      for (let i = 0; i < 14; i++) {
        damage = damage + roll_x(7)
      }
      toSend.damage = damage
    }
    socket.sendMessage(toSend);

  } else {
    alert("Далековато")
  }
}

function curved_bullets(index, cell) {
  var user_position = character_chosen.char_position
  var user_character_number = character_chosen.char_id
  var weapon = weapon_detailed_info[character_state.current_weapon[user_character_number]]
  var attacking_character = character_detailed_info[user_character_number]
  var bonus_attack = 0;
  var accumulated_cover = get_accumulated_cover(index, user_position);
  accumulated_cover = Math.max(parseInt(parseFloat(accumulated_cover)/2) - 2, 0)
  var toSend = damage_skill_template(index, user_position, weapon.range, user_character_number, character_chosen.skill_id, bonus_attack, weapon, accumulated_cover)
  if (toSend == null) {
    alert("Далековато")
  } else {
    socket.sendMessage(toSend);
  }
}

// helper function patterns
function check_cooldown(character_number, effect, message) {
  if (character_state.special_effects[character_number].hasOwnProperty(effect)) {
    if (character_state.special_effects[character_number][effect].cooldown == 0) {
      delete character_state.special_effects[character_number][effect]
      if (message.length > 0) {
        pushToList(message)
      }
    } else {
      character_state.special_effects[character_number][effect].cooldown = character_state.special_effects[character_number][effect].cooldown - 1
    }
  }
}

function setCooldown(character_number, cooldown_name, cooldown_length) {
  var cooldown_object = {};
  cooldown_object.cooldown = cooldown_length;
  character_state.special_effects[character_number][cooldown_name] = cooldown_object;
}

function restore_hp(character_number, amount) {
  var character = character_detailed_info[character_number]
  character_state.HP[character_number] = Math.min(character_state.HP[character_number] + amount, HP_values[character.stamina]);
}

function change_character_property(property, character_number, amount) {
  character_state[property][character_number] = character_state[property][character_number] + amount
}

function change_character_detailed_attribute(attribute, character_number, amount) {
  character_detailed_info[character_number][attribute] = parseInt(character_detailed_info[character_number][attribute]) + amount
}

function apply_effect(character_number, effect_number) {

  effect_number = parseInt(effect_number);
  switch (effect_number) {
    case 0: // увеличить силу
      change_character_detailed_attribute("strength", character_number, 1);
      break;
    case 1: // увеличить телосложение
      change_character_detailed_attribute("stamina", character_number, 1);
      var character = character_detailed_info[character_number];
      var stamina = character.stamina;

      var hp_upgrade = HP_values[stamina] - HP_values[stamina - 1];
      change_character_property("HP", character_number, hp_upgrade);

      var stamina_upgrade = stamina_values[stamina] - stamina_values[stamina - 1];
      change_character_property("stamina", character_number, stamina_upgrade);

      break;
    case 2: // увеличить ловкость
      change_character_detailed_attribute("agility", character_number, 1);
      break;
    case 3: // увеличить интеллект
      change_character_detailed_attribute("intelligence", character_number, 1);
      break;
    case 4: // увеличить КД
      change_character_property("bonus_KD", character_number, 1);
      break;

    case 5: // уменьшить силу
      change_character_detailed_attribute("strength", character_number, -1);
      break;
    case 6: // уменьшить телосложение
      change_character_detailed_attribute("stamina", character_number, -1);
      var character = character_detailed_info[character_number];
      var stamina = character.stamina;
      var hp_upgrade = Math.max(HP_values[stamina] - HP_values[stamina + 1], -1*character_state.HP[character_number] + 1);
      change_character_property("HP", character_number, hp_upgrade);

      var stamina_upgrade = Math.max(stamina_values[stamina] - stamina_values[stamina + 1], -1*character_state.stamina[character_number] + 1);
      change_character_property("stamina", character_number, stamina_upgrade);
      break;
    case 7: // уменьшить ловкость
      change_character_detailed_attribute("agility", character_number, -1);
      break;
    case 8: // уменьшить интеллект
      change_character_detailed_attribute("intelligence", character_number, -1);
      break;
    case 9: // уменьшить КД
      change_character_property("bonus_KD", character_number, -1);
      break;
    default:
      console.log("Tried to apply unknown effect")
  }
}

function forced_movement(from_index, to_index, character_number) {
  game_state.board_state[to_index] = character_number;
  character_state.position[character_number] = to_index;
  game_state.board_state[from_index] = 0;

  if (!(((my_role == 'player')&&(game_state.fog_state[to_index] == 1)) || (character_state.invisibility[character_number] != "all" && character_state.invisibility[character_number] != my_name))) {
    var to_cell = document.getElementById('cell_' + to_index);
    to_cell.src = get_object_picture(character_number);
  }

  if (!((my_role == 'player')&&(game_state.fog_state[from_index] == 1))) {
    var old_cell = document.getElementById("cell_" + from_index);
    old_cell.src = EMPTY_CELL_PIC;
  }
}

// прок газовой гранаты
function apply_bomb(position, radius, threshold) {
  var candidate_cells = index_in_radius(position, radius)
  //console.log(candidate_cells)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number]
      var message = character.name + " попадает под действие газовой бомбы"
      pushToList(message)
      if (character_state.special_effects[target_character_number].hasOwnProperty("gas_bomb_poison")) {
        character_state.special_effects[target_character_number].gas_bomb_poison.poison_level = character_state.special_effects[target_character_number].gas_bomb_poison.poison_level + 1
        if (character_state.special_effects[target_character_number].gas_bomb_poison.threshold < threshold) {
          character_state.special_effects[target_character_number].gas_bomb_poison.threshold = threshold;
        }
      } else {
        var gas_bomb_poison_object = {}
        gas_bomb_poison_object.poison_level = 1
        gas_bomb_poison_object.threshold = threshold
        character_state.special_effects[target_character_number].gas_bomb_poison = gas_bomb_poison_object
      }
      character_state.bonus_action[target_character_number] = character_state.bonus_action[target_character_number] - 1
      character_state.main_action[target_character_number] = character_state.main_action[target_character_number] - 1
    }
  }
}

function apply_calingalator(position, radius, flat_heal, roll_heal, heal_roll_list, coin_flip_list) {
  var candidate_cells = index_in_radius(position, radius)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе для отхила
      var character = character_detailed_info[target_character_number]
      var rolled_heal = flat_heal + heal_roll_list[target_character_number];
      restore_hp(target_character_number, rolled_heal);
      var message = character.name + " вдыхает целебные пары и восстанавливает " + rolled_heal + " хп."
      pushToList(message)
      var coin = coin_flip_list[target_character_number];

      var note = "";
      if (character_state.special_effects[target_character_number].hasOwnProperty("calingalator_target")) {
        var stage = character_state.special_effects[target_character_number].calingalator_target.stage;
        switch(stage) {
          case 1:
            if (coin > 5) {
              character_state.special_effects[target_character_number].calingalator_target.stage = 2;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage2;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_stage2;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_stage2 - calingalator_penalty_stage1)
              note = "Калингалятор вновь ударил " + character.name + " в голову. Вторая стадия отравления. Может пора остановится?.."
            } else {
              note = "На этот раз " + character.name + " избежал негативных эффектов калингалятора. Стадия остается первой."
            }
            break;
          case 2:
            if (coin < 5) {//1-4 = bad roll, poisoning
              character_state.special_effects[target_character_number].calingalator_target.stage = 3;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage3;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_stage3;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_stage3 - calingalator_penalty_stage2)
              change_character_property("melee_advantage", target_character_number, -1)
              change_character_property("ranged_advantage", target_character_number, -1)
              note = character.name + " стоило остановиться раньше. Теперь головокружение останется с вами надолго."
            } else if (coin < 10) {// 5-9 no effect, keep rolling
              note = character.name + " ходит по очень тонкому льду. Стадия остается второй. Пока что."
            } else {// You are enlightened
              character_state.special_effects[target_character_number].calingalator_target.stage = 4;
              character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_enlightened;
              character_state.special_effects[target_character_number].calingalator_target.penalty = calingalator_penalty_enlightened;
              change_character_property("attack_bonus", target_character_number, calingalator_penalty_enlightened - calingalator_penalty_stage2)
              change_character_property("melee_advantage", target_character_number, 1)
              change_character_property("ranged_advantage", target_character_number, 1)
              note = "Только раз я видел такую силу... " + character.name + " достиг Просвящения и будет нести его в мир."
            }
            break;

          case 3:
            character_state.special_effects[target_character_number].calingalator_target.duration = calingalator_poisoning_duration_stage3;
            note = character.name + " может хватит уже?"
            break;

          case 4:
            note = "Просвященный " + character.name + " продолжает делиться своим искусством. Невероятное зрелище."
            break;

          default:
            console.log("Так преисполниться не должно быть возможно");

        }
      } else {
        if (coin > 5) {
          var calingalator_target_object = {}
          calingalator_target_object.duration = calingalator_poisoning_duration_stage1;
          calingalator_target_object.penalty = calingalator_penalty_stage1
          calingalator_target_object.stage = 1;
          change_character_property("attack_bonus", target_character_number, calingalator_target_object.penalty)
          character_state.special_effects[target_character_number].calingalator_target = calingalator_target_object
          note = "Калингалятор слегка ударил " + character.name + " в голову. Первая стадия отравления."
        } else {
          note = character.name + " избежал негативных эффектов калингалятора. Виртуоз!"
        }
      }
      pushToList(note);
    }
  }
}

function apply_acid_bomb(position, radius) {
  var candidate_cells = index_in_radius(position, radius)
  //console.log(candidate_cells)
  for (let i = 0; i < candidate_cells.length; i++) {
    var target_character_number = game_state.board_state[candidate_cells[i]]
    if (target_character_number > 0) {// персонаж в радиусе бомбы
      var character = character_detailed_info[target_character_number]
      var message = character.name + " попадает под действие кислотной гранаты"
      pushToList(message)
      if (character_state.special_effects[target_character_number].hasOwnProperty("acid_bomb_poison")) {
        character_state.special_effects[target_character_number].acid_bomb_poison.duration = acid_bomb_duration
      } else {
        var acid_bomb_poison_object = {}
        acid_bomb_poison_object.duration = acid_bomb_duration
        var KD_change = parseInt(character_KD(target_character_number)/2)
        acid_bomb_poison_object.bonus_KD = KD_change
        character_state.special_effects[target_character_number].acid_bomb_poison = acid_bomb_poison_object
        character_state.bonus_KD[target_character_number] = character_state.bonus_KD[target_character_number] - KD_change
      }

    }
  }
}

function shocked_effect(target) {
  if (!character_state.special_effects[target].hasOwnProperty("shocked")) {
    var shocked_object = {}
    shocked_object.cooldown = shocked_cooldown
    character_state.special_effects[target].shocked = shocked_object
    character_state.defensive_advantage[target] = character_state.defensive_advantage[target] - 1
  } else {
    character_state.special_effects[target].shocked.cooldown = shocked_cooldown
  }
}

// computations related to skills
function compute_gas_bomb_threshold(character) {
  let bonus = Math.floor(parseInt(character.intelligence)/2);
  return bonus + gas_bomb_base_threshold;
}

// new round actions

function start_new_round() {
  var toSend = {};
  toSend.command = 'new_round';
  toSend.room_number = my_room;
  var save_roll = []
  var calingalator_heal_roll_list = []
  var calingalator_coin_flip = []

  for (let i = 1; i < character_state.can_evade.length; i++) {
    var character = character_detailed_info[i]
    if (character_state.special_effects[i] !== undefined && character_state.special_effects[i] !== null) {
      if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
        save_roll[i] = roll_x(20) + parseInt(character.stamina)
      }
      calingalator_heal_roll_list[i] = roll_x(calingalator_roll_heal);
      calingalator_coin_flip[i] = roll_x(10);
    }
  }
  toSend.save_roll_list = save_roll
  toSend.calingalator_heal_roll_list = calingalator_heal_roll_list
  toSend.calingalator_coin_flip = calingalator_coin_flip

  socket.sendMessage(toSend);
}

function apply_terrain_effects(data) {
  for (let i = 0; i < game_state.terrain_effects.length; i++) {
    if (game_state.terrain_effects[i] !== null && game_state.terrain_effects[i] !== undefined) {
      switch (game_state.terrain_effects[i].type) {
        case "gas_bomb":
            var position = game_state.terrain_effects[i].position;
            var radius = game_state.terrain_effects[i].radius;
            apply_bomb(position, radius, game_state.terrain_effects[i].threshold);
            if (radius >= 4) {
              if (my_role == "gm") {
                if (game_state.board_state[position] == obstacle_number_to_board_number(gas_bomb_obstacle)) {
                  delete_object_command(position)
                }
              }
              game_state.terrain_effects[i] = null
            } else {
              game_state.terrain_effects[i].radius += 1;
            }
            break;
        case "calingalator":
            var position = game_state.terrain_effects[i].position;
            var radius = game_state.terrain_effects[i].radius;
            apply_calingalator(position, radius, game_state.terrain_effects[i].flat_heal, game_state.terrain_effects[i].roll_heal, data.calingalator_heal_roll_list, data.calingalator_coin_flip);
            game_state.terrain_effects[i].duration = game_state.terrain_effects[i].duration - 1
            if (game_state.terrain_effects[i].duration == 0) {
              if (my_role == "gm") {
                if (game_state.board_state[position] == obstacle_number_to_board_number(calingalator_obstacle)) {
                  delete_object_command(position)
                }
              }
              game_state.terrain_effects[i] = null
            }
            break;
        default:
            console.log("Messed up resolving terrain effects")
            console.log(game_state.terrain_effects[i].type);
        }
    }
  }
}

function move_and_actions_replenish(character, index) {
  character_state.can_evade[index] = 1
  character_state.has_moved[index] = 0
  assign_moves(index)
  character_state.bonus_action[index] = bonus_action_map[character.agility];
  character_state.main_action[index] = main_action_map[character.agility];
}

function apply_tiredness(character, i) {
  if (character_state.special_effects[i].hasOwnProperty("tired")) { // Убрать бонусы от усталости прошлого хода (чтобы когда будут накаладываться новые не штрафовать дважды)
    character_state.universal_bonus[i] = character_state.universal_bonus[i] - character_state.special_effects[i].tired.bonus
  }

  if (character_state.stamina[i] < stamina_values[character.stamina] * 0.67) {
    if (character_state.stamina[i] < stamina_values[character.stamina] * 0.34) {
      if (character_state.stamina[i] <= 0) { // 3я стадия
        var tired_object = {}
        tired_object.bonus = -3
        tired_object.stage = 3
        character_state.special_effects[i].tired = tired_object
        character_state.universal_bonus[i] = character_state.universal_bonus[i] - 3
        character_state.move_action[i] = parseFloat(character_state.move_action[i]*0.25)
        if ((character_state.main_action[i] == 1)&&(character_state.bonus_action[i] == 1)) {
          character_state.bonus_action[i] = 0
        } else {
          character_state.bonus_action[i] = 1
          character_state.main_action[i] = 1
        }
      } else { // 2я стадия
        var tired_object = {}
        tired_object.bonus = -2
        tired_object.stage = 2
        character_state.special_effects[i].tired = tired_object
        character_state.universal_bonus[i] = character_state.universal_bonus[i] - 2
        character_state.move_action[i] = parseFloat(character_state.move_action[i]*0.5)
      }
    } else { // 1я стадия
      var tired_object = {}
      tired_object.bonus = -1
      tired_object.stage = 1
      character_state.special_effects[i].tired = tired_object
      character_state.universal_bonus[i] = character_state.universal_bonus[i] - 1
      character_state.move_action[i] = parseFloat(character_state.move_action[i]*0.75)
    }
  } else if (character_state.special_effects[i].hasOwnProperty("tired")) { // не устал -> убрать устлалость если была
    delete character_state.special_effects[i].tired
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
  check_cooldown(i, "jump_user", "");
  check_cooldown(i, "belvet_jump", "");
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
      character_state.defensive_advantage[i] = character_state.defensive_advantage[i] - safety_service_defensive_advantage
      character_state.evade_bonus[i] = character_state.evade_bonus[i] - safety_service_evade_bonus
      delete character_state.special_effects[i].safety_service_target
    } else {
      character_state.special_effects[i].safety_service_target.duration = character_state.special_effects[i].safety_service_target.duration - 1
    }
  }
}

function belvet_buff_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("belvet_buff_target")) {
    if (character_state.special_effects[i].belvet_buff_target.duration == 0) {
      change_character_property("attack_bonus", i, -1*character_state.special_effects[i].belvet_buff_target.attack_bonus);
      change_character_property("melee_advantage", i, -1*character_state.special_effects[i].belvet_buff_target.melee_advantage);
      change_character_property("ranged_advantage", i, -1*character_state.special_effects[i].belvet_buff_target.ranged_advantage);
      delete character_state.special_effects[i].belvet_buff_target
    } else {
      character_state.special_effects[i].belvet_buff_target.duration = character_state.special_effects[i].belvet_buff_target.duration - 1
    }
  }
}

function hook_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("hook_target")) {
    if (character_state.special_effects[i].hook_target.duration == 0) {
      change_character_property("defensive_advantage", i, -1*character_state.special_effects[i].hook_target.defensive_advantage);
      delete character_state.special_effects[i].hook_target
    } else {
      character_state.special_effects[i].hook_target.duration -= 1
    }
  }
}

function calingalator_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("calingalator_target")) {
    if (character_state.special_effects[i].calingalator_target.duration == 0) {
      var reverse_penalty = character_state.special_effects[i].calingalator_target.penalty * (-1)
      change_character_property("attack_bonus", i, reverse_penalty);
      if (character_state.special_effects[i].calingalator_target.stage == 3) {
        change_character_property("melee_advantage", i, 1);
        change_character_property("ranged_advantage", i, 1);
      } else if (character_state.special_effects[i].calingalator_target.stage == 4) {
        change_character_property("melee_advantage", i, -1);
        change_character_property("ranged_advantage", i, -1);
      }
      delete character_state.special_effects[i].calingalator_target
    } else {
      character_state.special_effects[i].calingalator_target.duration = character_state.special_effects[i].calingalator_target.duration - 1
    }
  }
}

function pich_pich_user_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("pich_pich_user")) {
    if (character_state.special_effects[i].pich_pich_user.cooldown == 0) {
      delete character_state.special_effects[i].pich_pich_user
    } else {
      if (character_state.special_effects[i].pich_pich_user.cooldown == pich_pich_cooldown) {
        character_state.bonus_action[i] = 0
      }
      character_state.special_effects[i].pich_pich_user.cooldown = character_state.special_effects[i].pich_pich_user.cooldown - 1
    }
  }
}

function pich_pich_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("pich_pich_target")) {
      var extra_actions = character_state.special_effects[i].pich_pich_target.extra_actions
      while (extra_actions > 0) {
        if (extra_actions % 2 == 0) {
          character_state.move_action[i] = character_state.move_action[i] + adrenaline_move_increase
        } else {
          character_state.main_action[i] = character_state.main_action[i] + 1
        }
        extra_actions = extra_actions - 1
      }
      delete character_state.special_effects[i].pich_pich_target
  }
}

function aim_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("aim")) {
    delete character_state.special_effects[i].aim
  }
}

function adrenaline_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("adrenaline_target")) {
      var minus_actions = character_state.special_effects[i].adrenaline_target.minus_actions
      while (minus_actions > 0) {
        if (minus_actions % 2 == 0) {
          character_state.move_action[i] = character_state.move_action[i] - adrenaline_move_increase
        } else {
          character_state.main_action[i] = character_state.main_action[i] - 1
        }
        minus_actions = minus_actions - 1
      }
      delete character_state.special_effects[i].adrenaline_target
  }
}

function poisonous_adrenaline_target_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("poisonous_adrenaline_target")) {
      var turn = character_state.special_effects[i].poisonous_adrenaline_target.turn
      character_state.special_effects[i].poisonous_adrenaline_target.turn = turn + 1
      var extra_actions = character_state.special_effects[i].poisonous_adrenaline_target.extra_actions[turn]
      while (extra_actions > 0) {
        if (extra_actions % 2 == 0) {
          character_state.move_action[i] = character_state.move_action[i] + adrenaline_move_increase
        } else {
          character_state.main_action[i] = character_state.main_action[i] + 1
        }
        extra_actions = extra_actions - 1
      }
      if (turn + 1 == poisonous_adrenaline_duration) {
        var character = character_detailed_info[i]
        var max_HP = HP_values[character.stamina]
        var max_stamina = stamina_values[character.stamina]
        var HP_cost = poisonous_adrenaline_flat_HP + parseInt(parseFloat(max_HP) * poisonous_adrenaline_percent_HP)
        var stamina_cost = poisonous_adrenaline_flat_stamina + parseInt(parseFloat(max_stamina) * poisonous_adrenaline_percent_stamina)
        character_state.HP[i] = character_state.HP[i] - HP_cost
        character_state.stamina[i] = character_state.stamina[i] - stamina_cost
        delete character_state.special_effects[i].poisonous_adrenaline_target
        var message = "Адреналин в крови " + character.name + " заканчивается, наступает похмелье (" + HP_cost + " хп и " + stamina_cost + " выносливости)"
        pushToList(message)
      }
  }
}

function shocked_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("shocked")) {
    if (character_state.special_effects[i].shocked.cooldown == 0) {
      character_state.defensive_advantage[i] = character_state.defensive_advantage[i] + 1
      delete character_state.special_effects[i].shocked
    } else {
      character_state.special_effects[i].shocked.cooldown = character_state.special_effects[i].shocked.cooldown - 1
    }
  }
}

function cut_limb_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("cut_limb")) {
    if (character_state.special_effects[i].cut_limb.duration == 0) {
      delete character_state.special_effects[i].cut_limb
      var message = "Сухожилия " + character.name + " восстановились."
      pushToList(message)
    } else {
      character_state.move_action[i] = -10
      character_state.special_effects[i].cut_limb.duration = character_state.special_effects[i].cut_limb.duration - 1
    }
  }
}

function healed_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("healed")) {
    if (character_state.special_effects[i].healed.cooldown > 0) {
      character_state.move_action[i] = character_state.move_action[i]/2
      character_state.main_action[i] = character_state.main_action[i] - 1
      character_state.bonus_action[i] = character_state.bonus_action[i] - 1
      character_state.special_effects[i].healed.cooldown = character_state.special_effects[i].healed.cooldown - 1
    } else {
      delete character_state.special_effects[i].healed
    }
  }
}

function blind_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("blind")) {
    if (character_state.special_effects[i].blind.cooldown > 0) {
      character_state.special_effects[i].blind.cooldown = character_state.special_effects[i].blind.cooldown - 1
    } else {
      delete character_state.special_effects[i].blind
      character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 2
      character_state.melee_advantage[i] = character_state.melee_advantage[i] + 1
      var message = "Зрение " + character.name + " восстановилось"
      pushToList(message)
    }
  }
}

function Marcus_stacks_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("Markus_stacks")) {
    character_state.special_effects[i].Markus_stacks = character_state.special_effects[i].Markus_stacks - 1
    if (character_state.special_effects[i].Markus_stacks == 0) {
      delete character_state.special_effects[i].Markus_stacks
    }
  }
}

function shield_up_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("shield_up")) {
    character_state.move_action[i] = Math.ceil(character_state.move_action[i]/2)
    character_state.stamina[i] = character_state.stamina[i] - character_state.special_effects[i].shield_up.stamina_cost
    var message = character.name + " продолжает держать щит (спасибо)"
    pushToList(message)
  }
}

function big_bro_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("big_bro")) {
    if (character_state.special_effects[i].big_bro.cooldown == 0) {
      character_state.bonus_KD[i] = character_state.bonus_KD[i] - character_state.special_effects[i].big_bro.bonus_KD
      delete character_state.special_effects[i].big_bro
      var message = character.name + " теряет защиту Большого Брата"
      pushToList(message)
    } else {
      character_state.special_effects[i].big_bro.cooldown = character_state.special_effects[i].big_bro.cooldown - 1
    }
  }
}

function tobacco_strike_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("tobacco_strike")) {
    if (character_state.special_effects[i].tobacco_strike.cooldown == 0) {
      delete character_state.special_effects[i].tobacco_strike
    } else {
      if (character_state.special_effects[i].tobacco_strike.cooldown == tobacco_strike_cooldown) {
        character_state.attack_bonus[i] = character_state.attack_bonus[i] - tobacco_strike_bonus
      }
      character_state.special_effects[i].tobacco_strike.cooldown = character_state.special_effects[i].tobacco_strike.cooldown - 1
    }
  }
}

function acid_bomb_poison_round_effect(i, character) {
  if (character_state.special_effects[i].hasOwnProperty("acid_bomb_poison")) {
    if (character_state.special_effects[i].acid_bomb_poison.duration == 0) {
      character_state.bonus_KD[i] = character_state.bonus_KD[i] + character_state.special_effects[i].acid_bomb_poison.bonus_KD
      delete character_state.special_effects[i].acid_bomb_poison
      var message = "Броня " + character.name + " наконец восстановилась"
      pushToList(message)
    } else {
      character_state.special_effects[i].acid_bomb_poison.duration = character_state.special_effects[i].acid_bomb_poison.duration - 1
    }
  }
}

function gas_bomb_poison_round_effect(i, character, data) {
  if (character_state.special_effects[i].hasOwnProperty("gas_bomb_poison")) {
    var save_roll = data.save_roll_list[i]
    if (save_roll >= character_state.special_effects[i].gas_bomb_poison.threshold) {
      character_state.special_effects[i].gas_bomb_poison.poison_level = character_state.special_effects[i].gas_bomb_poison.poison_level - 1
      var message = character.name + " успешно кидает спасбросок и уменьшает стадию отравления (теперь " + character_state.special_effects[i].gas_bomb_poison.poison_level + ")"
      pushToList(message)
    } else {
      var message = character.name + " проваливает спасбросок. Стадия отравления остается прежней (" + character_state.special_effects[i].gas_bomb_poison.poison_level + ")"
      pushToList(message)
    }

    var count = character_state.special_effects[i].gas_bomb_poison.poison_level
    while (count > 0) {
      //character_state.move_action[i] = character_state.move_action[i] - gas_bomb_move_reduction
      if (count % 2 == 1) {
        character_state.main_action[i] = character_state.main_action[i] - 1
      } else {
        character_state.bonus_action[i] = character_state.bonus_action[i] - 1
      }
      count = count - 1
    }

    if (character_state.special_effects[i].gas_bomb_poison.poison_level <= 0) {
      delete character_state.special_effects[i].gas_bomb_poison
      var message = character.name + " больше не отравлен!"
      pushToList(message)
    }
  }
}

function meleed_round_effect(i) {
  if (character_state.special_effects[i].hasOwnProperty("meleed")) {
    if (character_state.special_effects[i].meleed.cooldown <= 0) {
      delete character_state.special_effects[i].meleed
      character_state.ranged_advantage[i] = character_state.ranged_advantage[i] + 1
    } else {
      character_state.special_effects[i].meleed.cooldown = character_state.special_effects[i].meleed.cooldown - 1
    }
  }
}

function sniper_passive_round_effect(i, character) {
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

// More gm control actions

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
  socket.sendMessage(toSend);
}

function show_landmines() {
  var landmines_array = game_state.landmines.positions
  for (let i = 0; i < landmines_array.length; i++) {
    var current_mine = landmines_array[i]
    if (game_state.landmines.knowers[current_mine].includes(my_name)) {
      var cell = document.getElementById('cell_' + current_mine);
      cell.src = "/images/landmine.jfif"
    }
  }
}

function clear_character_state() {
  character_state = CHARACTER_STATE_CONSTANT
}

function clear_character(number) {
  //character_detailed_info[number] = null
  character_state.HP[number] = null
  character_state.main_action[number] = null
  character_state.bonus_action[number] = null
  character_state.move_action[number] = null
  character_state.stamina[number] = null
  character_state.initiative[number] = null
  character_state.can_evade[number] = null
  character_state.has_moved[number] = null
  character_state.KD_points[number] = null
  character_state.current_weapon[number] = null
  character_state.visibility[number] = null
  character_state.attack_bonus[number] = null
  character_state.damage_bonus[number] = null
  character_state.universal_bonus[number] = null
  character_state.bonus_KD[number] = null
  character_state.special_effects[number] = {}
  character_state.ranged_advantage[number] = null
  character_state.melee_advantage[number] = null
  character_state.defensive_advantage[number] = null
}

function w_onclick() {
  var character_number = character_chosen.char_id;
  if (my_role == "gm" || character_state.visibility[character_number] == 1) {
    if (character_chosen.in_process == 1) {
      undo_selection()
    } else {
      var index = character_state.position[character_number];
      var cell = document.getElementById('cell_' + index);
      choose_character_to_move(index, cell, true);
    }
  }
}

function a_onclick() {
  var character_number = character_chosen.char_id
  if (my_role == "gm" || character_state.visibility[character_number] == 1) {

    if (character_chosen.in_process == 2) {
      stop_attack()
    } else {
      var index = character_state.position[character_number];
      var cell = document.getElementById('cell_' + index);
      var main_actions_left = character_state.main_action[character_number]
      if (main_actions_left > 0) {
        choose_character_to_attack(cell)
      } else {
        alert("У вас не осталось действий!")
      }
    }
  }
}

function compare_initiative(a,b) {
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
  //console.log(data);
  if (((data.to_name == my_name) || (data.to_name == 'all')) && (data.room_number == my_room)) {
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

        dropbox_image.on("dragover", function(event) {
          event.preventDefault();
        });

        dropbox_image.on("drop", function(event) {
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
            for (let j = (i+1); j < initiative_order_array.length; j++) {
              //var selector = "#initiative_image_" + j;
              var initiative_image = $("[array_position=" + j + "]");
              var new_index = j-1;
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
            if(keyCode == 81) {
                fogModeChange();
            } else if (keyCode == 87) { // w
              w_onclick()
            } else if (keyCode == 65) { // a
              a_onclick()
            }
        };
      }
      character_list = data.character_list;
      group_list = data.character_group_list;
      obstacle_list = data.obstacle_list;
      weapon_list = data.weapon_list
      weapon_detailed_info = data.weapon_detailed_info
      skill_detailed_info = data.skill_detailed_info
      skill_list = data.skill_list
      saves_list = data.saves_list
      item_list = data.item_list
      item_detailed_info = data.item_detailed_info

      for (let i = 0; i < saves_list.length; i++) {
        var current_option = $("<option>");
        current_option.text(saves_list[i]);
        current_option.val(saves_list[i]);
        saves_select.append(current_option);
      }

    } else if (data.command == 'construct_board_response') {
      clear_character_state()
      construct_board(data.game_state);
    } else if (data.command == 'add_character_response') {
      game_state.board_state[data.cell_id] = data.character_number;
      var character = data.character_info;
      character_detailed_info[data.character_number] = character;
      character_detailed_info[data.character_number].strength = parseInt(character.strength);
      character_detailed_info[data.character_number].stamina = parseInt(character.stamina);
      character_detailed_info[data.character_number].agility = parseInt(character.agility);
      character_detailed_info[data.character_number].intelligence = parseInt(character.intelligence);
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
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
      character_state.current_weapon[data.character_number] = character.inventory[0]
      character_state.attack_bonus[data.character_number] = 0
      character_state.damage_bonus[data.character_number] = 0
      character_state.universal_bonus[data.character_number] = 0
      character_state.ranged_advantage[data.character_number] = 0
      character_state.melee_advantage[data.character_number] = 0
      character_state.defensive_advantage[data.character_number] = 0
      character_state.special_effects[data.character_number] = {}
      character_state.position[data.character_number] = data.cell_id;
      if (character.hasOwnProperty("evade_bonus")) {
        character_state.evade_bonus[data.character_number] = parseInt(character.evade_bonus);
      } else {
        character_state.evade_bonus[data.character_number] = 0;
      }

      if (character.hasOwnProperty("melee_resist")) {
        character_state.melee_resist[data.character_number] = parseFloat(character.melee_resist)/100;
      } else {
        character_state.melee_resist[data.character_number] = 0.0;
      }

      if (character.hasOwnProperty("bullet_resist")) {
        character_state.bullet_resist[data.character_number] = parseFloat(character.bullet_resist)/100;
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
      if (!((my_role == 'player')&&(game_state.fog_state[data.cell_id] == 1))) {
        var cell = document.getElementById("cell_" + data.cell_id);
        cell.src = obstacle.avatar;
      }
      game_state.board_state[data.cell_id] = data.obstacle_number * (-1);
    } else if (data.command == 'move_character_response') {
      receiveMoveOverall(data, "move");
    } else if (data.command == 'delete_object_response') {
      if (data.hasOwnProperty("character_number")) {
        clear_character(data.character_number)
      }
      if (game_state.board_state[data.index] < 0) {// is obstacle
        game_state.obstacle_extra_info[data.index] = {};
      }
      game_state.board_state[data.index] = 0;
      if (!((my_role == 'player')&&(game_state.fog_state[data.index] == 1))) {
        var cell = document.getElementById('cell_' + data.index);
        cell.src = EMPTY_CELL_PIC;
      }
    } else if (data.command == 'roll_initiative_response') {
      character_state.initiative = data.initiative_state;
      initiative_order_array = data.initiative_order_array;
      display_initiative_line();
    } else if (data.command == 'deal_damage_response') {
      if (data.type == 'damage') {
        character_state.HP[data.character_number] = character_state.HP[data.character_number] - data.damage;
      } else {
        character_state.stamina[data.character_number] -= data.stamina_change;
      }
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
      display_initiative_line()
    } else if (data.command == 'update_fog_response') {
				var index_list = data.index_list;
        var fog_state;
        if (data.update_type == 'remove') {
          fog_state = 0;
        } else {
          fog_state = 1;
        }

        for (let i = 0; i < index_list.length; i++) {
          let index = index_list[i];
          var cell = document.getElementById('cell_' + index);
          game_state.fog_state[index] = fog_state;
          cell.src = fogOrPic(index);
        }
		} else if (data.command == 'assign_zone_response') {
      var index_list = data.index_list
      for (let i = 0; i < index_list.length; i++) {
        game_state.zone_state[index_list[i]] = data.zone_number;
        game_state.search_modificator_state[index_list[i]] = data.modificator;
      }
    } else if (data.command == 'change_character_visibility_response') {
      character_state.visibility[data.character_number] = data.new_value;
    } else if (data.command == 'simple_roll_response') {
      var message = data.character_name + " бросает " + data.roll
      pushToList(message)
    } else if (data.command == 'skill_response') {

      var user_index = data.user_index
      character_state.has_moved[user_index] = 1
      if (data.hasOwnProperty("aim_over")) {
        delete character_state.special_effects[user_index].aim
      }
      switch(data.skill_index) {
        case 0: // рывок
            character = character_detailed_info[user_index]
            var charge_move_increase = parseInt(character.agility)
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.move_action[user_index] = character_state.move_action[user_index] + charge_move_increase
            if (character.special_type != 'rogue' || character_state.special_effects[user_index].hasOwnProperty('pre_charge')) {
              var charge_user_object = {}
              charge_user_object.cooldown = 0
              character_state.special_effects[user_index].charge_user = charge_user_object
            } else {
              var pre_charge_object = {}
              pre_charge_object.cooldown = 0
              character_state.special_effects[user_index].pre_charge = pre_charge_object
            }

            var message = character.name + " совершает рывок"
            pushToList(message)
            break;
          case 1: // прилив адреналина
            var user = character_detailed_info[user_index]
            var target_index = data.target_index
            var target = character_detailed_info[target_index]
            var extra_actions = data.extra_actions
            character_state.stamina[target_index] = character_state.stamina[target_index] - adrenaline_stamina_cost
            while (extra_actions > 0) {
              if (extra_actions % 2 == 0) {
                character_state.move_action[target_index] = character_state.move_action[target_index] + adrenaline_move_increase
              } else {
                character_state.main_action[target_index] = character_state.main_action[target_index] + 1
              }
              extra_actions = extra_actions - 1
            }
            var adrenaline_object_target = {}
            adrenaline_object_target.minus_actions = data.minus_actions
            character_state.special_effects[target_index].adrenaline_target = adrenaline_object_target

            var adrenaline_object_user = {}
            adrenaline_object_user.cooldown = adrenaline_cooldown
            character_state.special_effects[user_index].adrenaline_user = adrenaline_object_user

            var message = user.name + " использует прилив адреналина. "  + target.name + " получает " + data.extra_actions + " действий. Это будет стоить " + data.minus_actions + " действий на следующий ход."
            pushToList(message)
            break;
          case 2: // подрезание сухожилий
            var attacker = character_detailed_info[user_index]
            var target = character_detailed_info[data.target_id]
            if (game_state.battle_mod == 1) {
              character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_cut_limb_cost
              character_state.main_action[user_index] = character_state.main_action[user_index] - 1
              character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            }
            var cut_limb_object = {}
            cut_limb_object.cooldown = cut_limb_cooldown
            character_state.special_effects[user_index].cut_limb_user = cut_limb_object
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
                  limb_cut_object.duration = cut_limb_duration
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                do_damage(data.target_id, data.damage_roll)
                break;
              case "damage_after_evasion":
                if (data.skill_outcome == "success") {
                  var limb_cut_object = {}
                  limb_cut_object.duration = cut_limb_duration
                  character_state.special_effects[data.target_id].cut_limb = limb_cut_object
                  character_state.move_action[data.target_id] = -10
                  var message = attacker.name + " успешно подрезает " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                } else {
                  var message = attacker.name + " безуспешно пытается подрезать " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона."
                }
                pushToList(message)
                do_damage(data.target_id, data.damage_roll)
                character_state.can_evade[data.target_id] = 0
                break;
            case "full_crit":
              var limb_cut_object = {}
              limb_cut_object.duration = cut_limb_duration + 1
              character_state.special_effects[data.target_id].cut_limb = limb_cut_object
              character_state.move_action[data.target_id] = -10
              var message = attacker.name + " критически подрезает " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона."
              pushToList(message)
              do_damage(data.target_id, data.damage_roll)
              break;
            case "full_cover":
              var message = attacker.name + " пытался подрезать " + target.name + " но тот находится в полном укрытии."
              pushToList(message)
              break;
            default:
              console.log("fucked up resolving damage")
              break;
          }
            break;
        case 3: // слабое место
          var attacker = character_detailed_info[user_index]
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_weakspot_cost
          var target = character_detailed_info[data.target_id]
          if (data.outcome == "success") {
            var weakspot_object = {}
            weakspot_object.hunter_id = user_index
            character_state.special_effects[data.target_id].weakspot = weakspot_object
            var message = attacker.name + " успешно обнаружил слабое место " + target.name
          } else {
            var message = attacker.name + " не удалось обнаружить слабое место " + target.name
          }
          pushToList(message)
          break;

        case 4: // лечение
        var healer = character_detailed_info[user_index]
        var target = character_detailed_info[data.target_id]
        character_state.main_action[user_index] = character_state.main_action[user_index] - 1
        character_state.stamina[user_index] = character_state.stamina[user_index] - 1
        var cooldown = 0
        if (character_state.initiative[user_index] > character_state.initiative[data.target_id]) {
          // пациент не ходит в этот же ход
          character_state.main_action[data.target_id] = character_state.main_action[data.target_id] - 1
          character_state.bonus_action[data.target_id] = character_state.bonus_action[data.target_id] - 1
          character_state.move_action[data.target_id] = character_state.move_action[data.target_id]/2
          cooldown = 0
        } else {
          cooldown = 1
        }
        var healed_object = {}
        healed_object.cooldown = cooldown
        character_state.special_effects[data.target_id].healed = healed_object
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
        case 5: // большой брат
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1
          var shield = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          var message = shield.name + " защитил " +  target.name + " (+" + data.bonus_KD + "кд)"
          pushToList(message)
          character_state.bonus_KD[data.target_id] = character_state.bonus_KD[data.target_id] + data.bonus_KD
          var big_bro_object = {}
          big_bro_object.cooldown = cooldown_big_bro
          big_bro_object.bonus_KD = data.bonus_KD
          character_state.special_effects[data.target_id].big_bro = big_bro_object
          break;
        case 6: // поднять щиты
          var shield = character_detailed_info[user_index]
          if (data.outcome == "shield_up") {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] + shield_up_KD
            var shield_up_object = {}
            shield_up_object.stamina_cost = shield_up_stamina_cost
            shield_up_object.KD = shield_up_KD
            character_state.special_effects[user_index].shield_up = shield_up_object
            var message = shield.name + " поднял щиты за чат"
            pushToList(message)
          } else {
            character_state.bonus_KD[user_index] = character_state.bonus_KD[user_index] - shield_up_KD
            delete character_state.special_effects[user_index].shield_up
            var message = shield.name + " опустил щит. Чат прости("
            pushToList(message)
          }
          break;
        case 7: // пожирание сущности
          var attacker = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1

          character_state.HP[data.target_id] = character_state.HP[data.target_id] - data.damage
          if (character_state.special_effects[data.target_id].hasOwnProperty("Markus_stacks")) {
            character_state.special_effects[data.target_id].Markus_stacks = character_state.special_effects[data.target_id].Markus_stacks + 2
          } else {
            character_state.special_effects[data.target_id].Markus_stacks = 2
          }
          if (character_state.special_effects[user_index].hasOwnProperty("biopool")) {
            character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool + data.damage
          } else {
            character_state.special_effects[user_index].biopool = data.damage
          }
          var message = attacker.name + " наносит " + target.name + " " + data.damage + " урона от которого невозможно увернуться"
          pushToList(message)
          break;
        case 9: // абсолютное восстановление
          var healer = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - 1

          character_state.HP[data.target_id] = character_state.HP[data.target_id] + data.heal_amount
          character_state.special_effects[user_index].biopool = character_state.special_effects[user_index].biopool - data.heal_amount
          var message = healer.name + " восстаналивает " + target.name + " " + data.heal_amount + " хп"
          pushToList(message)
          break;
        case 10: // получить бонус
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] + 1
            var message = character.name + " меняет обычное на бонусное действие"
            pushToList(message)
            break;
        case 11: // отдых
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = 0
            character_state.bonus_action[user_index] = 0
            character_state.move_action[user_index] = 0
            character_state.stamina[user_index] = data.new_stamina
            var message = character.name + " отдыхает. Хорошего отпуска!"
            pushToList(message)
            break;

        case 12: // газовая граната
            character = character_detailed_info[user_index]
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.stamina[user_index] = character_state.stamina[user_index] - gas_bomb_stamina_cost

            var message = character.name + " бросает газовую бомбу. Советуем задержать дыхание."
            pushToList(message)

            var bomb_object = {}
            bomb_object.type = "gas_bomb"
            bomb_object.position = data.position
            bomb_object.threshold = data.threshold
            bomb_object.radius = 3
            game_state.terrain_effects.push(bomb_object)

            var gas_bomb_user = {}
            gas_bomb_user.cooldown = gas_bomb_skill_cooldown
            character_state.special_effects[user_index].gas_bomb_user = gas_bomb_user

            var initial_radius = 2

            apply_bomb(data.position, initial_radius, data.threshold)

            break;

        case 13: // светошумовая гранат
            var light_sound_bomb_user = {}
            light_sound_bomb_user.cooldown = light_sound_bomb_skill_cooldown
            character_state.special_effects[user_index].light_sound_bomb_user = light_sound_bomb_user

            for (let i = 0; i < data.outcome_list.length; i++) {
              var character_number = data.character_list[i]
              var character = character_detailed_info[character_number]
              if (data.outcome_list[i] == 0) { // Прошел спасбросок
                var message = character.name + " успел прикрыть глаза"
                pushToList(message)
              } else {
                var message = character.name + " ослеп на 2 хода"
                pushToList(message)
                if (character_state.special_effects[character_number].hasOwnProperty("blind")) {// не накладывваем еще штраф
                  character_state.special_effects[character_number].blind.cooldown = 2
                } else {
                  var blind_object = {}
                  blind_object.cooldown = 2
                  character_state.special_effects[character_number].blind = blind_object
                  character_state.ranged_advantage[character_number] = character_state.ranged_advantage[character_number] - 2
                  character_state.melee_advantage[character_number] = character_state.melee_advantage[character_number] - 1
                }
              }
            }
            break;

        case 14: // шокировать (дрон + уязвимость)
          var attacker = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          }
        switch (data.outcome) {
          case "KD_block":
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
            pushToList(message)
            break;
          case "evaded":
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
            pushToList(message)
            if (target.special_type != 'rogue') {
              character_state.can_evade[data.target_id] = 0
            }
            break;
          case "damage_without_evasion":
            shocked_effect(data.target_id)

            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
          case "damage_after_evasion":
            shocked_effect(data.target_id)
            var message = attacker.name + " стреляет в " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + ") и шокирует цель (уязвимость). Атака наносит " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
        case "full_crit":
          shocked_effect(data.target_id)
          var message = attacker.name + " критически попадает в " + target.name + ", не оставляя возможности увернуться и шокирует цель. Атака наносит " + data.damage_roll + " урона."
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          break;
        case "full_cover":
          var message = attacker.name + " пытался шокировать " + target.name + " но тот находится в полном укрытии."
          pushToList(message)
          break;
        default:
          console.log("fucked up resolving damage")
          break;
      }
          break;

        case 15: // пыщ пыщ гоу
          var user = character_detailed_info[user_index]
          var target_index = data.target_index
          var target = character_detailed_info[target_index]
          var extra_actions = data.extra_actions
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          }
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + pich_pich_move_increase
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1
            }
            extra_actions = extra_actions - 1
          }
          var pich_pich_object_target = {}
          pich_pich_object_target.extra_actions = data.extra_actions
          character_state.special_effects[target_index].pich_pich_target = pich_pich_object_target

          var pich_pich_object_user = {}
          pich_pich_object_user.cooldown = pich_pich_cooldown
          character_state.special_effects[user_index].pich_pich_user = pich_pich_object_user

          var message = user.name + " использует Пыщ-Пыщ-Гоу. "  + target.name + " получает " + data.extra_actions + " доп действий на этот и следующий ход."
          pushToList(message)
          break;
        case 16: // силовое поле
            if (game_state.battle_mod == 1) {
              character_state.main_action[user_index] = character_state.main_action[user_index] - 1
              character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
              character_state.stamina[user_index] = character_state.stamina[user_index] - force_field_stamina_cost
            }
            var shield_object = {}
            shield_object.type = "force_field"
            shield_object.position = data.position
            shield_object.radius = force_field_radius
            shield_object.shield = data.shield
            shield_object.character_list = data.character_list
            shield_object.cells_protected = data.cells_protected
            game_state.terrain_effects.push(shield_object)

            var shield_index = game_state.terrain_effects.length - 1
            var char_list = data.character_list

            var force_field_target = {}
            force_field_target.shield_index = shield_index

            for (let i = 0; i < char_list.length; i++) {
              var character_number = char_list[i]
              character_state.special_effects[character_number].force_field_target = force_field_target
            }

            var force_field_user = {}
            force_field_user.cooldown = force_field_cooldown
            character_state.special_effects[user_index].force_field_user = force_field_user
            var character = character_detailed_info[user_index]
            var message = character.name + " активирует силовое поле"
            pushToList(message)
            break;

        case 17: // инвиз
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          }
          character_state.invisibility[user_index] = data.username
          if (my_name != data.username) {
            var cell = document.getElementById('cell_' + data.position);
            cell.src = EMPTY_CELL_PIC;
          }
          break;

        case 18: // боевая универсальность
          character_state.special_effects[user_index].adaptive_fighting = -1;
          var character = character_detailed_info[user_index]
          var message = character.name + " активирует боевую универсальность"
          pushToList(message)
          break;

        case 19: // лаки шот
          var character = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.stamina[user_index] = character_state.stamina[user_index] - lucky_shot_stamina_cost
          }

          if (data.roll == 7) {
            do_damage(data.target_id, data.damage)
            var message = "Удача благоволит " + character.name + ", который наносит " + data.damage + " урона " + target.name
          } else {
            var message = data.roll + " это не число " + character.name + ", так что " + target.name + " избегает атаки."
          }
          pushToList(message)

          break;

      case 20: // lottery_shot
          var character = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.stamina[user_index] = character_state.stamina[user_index] - lottery_shot_stamina_cost
          }

          if (data.roll == 7) {
            do_damage(data.target_id, data.damage)
            var message = "Какая удача! Фортуна явно на стороне " + character.name + ", который наносит " + data.damage + " урона " + target.name
          } else if (data.roll == 77) {
            do_damage(data.target_id, data.damage)
            var message = "Джекпот! " + character.name + " сегодня стоит купить лотерейный билет, а пока он наносит " + data.damage + " урона " + target.name
          } else {
            var message = data.roll + " это не число " + character.name + ", так что " + target.name + " избегает атаки."
          }
          pushToList(message)

          break;

      case 21: //всплеск действий
          var user = character_detailed_info[user_index]
          character_state.main_action[user_index] = character_state.main_action[user_index] + data.extra_actions
          character_state.bonus_action[user_index] = 0
          if (game_state.battle_mod == 1) {
            character_state.stamina[user_index] = character_state.stamina[user_index] - action_splash_stamina_cost*data.extra_actions
          }

          var action_splash_object = {}
          action_splash_object.cooldown = action_splash_cooldown
          character_state.special_effects[user_index].action_splash = action_splash_object

          var message = user.name + " использует всплеск действий и получает " + data.extra_actions + " основных действий вместо бонусных."
          pushToList(message)
          break;

      case 22: // град ударов
          var character = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = 0
            character_state.stamina[user_index] = character_state.stamina[user_index] - punch_rainfall_stamina_cost*data.total_attacks
          }
          if (data.damage > 0) {
            character_state.can_evade[data.target_id] = 0;
          }

          do_damage(data.target_id, data.damage)
          var message = character.name + " наносит град из " + data.total_attacks + " ударов, из которых " + data.successfull_attacks + " попадают в " + target.name + " нанося " + data.damage + " урона."

          pushToList(message)

          break;

      case 23: // адреналиновый потоп
          var user = character_detailed_info[user_index]
          var target_index = data.target_index
          var target = character_detailed_info[target_index]
          var extra_actions = data.extra_actions[0]
          while (extra_actions > 0) {
            if (extra_actions % 2 == 0) {
              character_state.move_action[target_index] = character_state.move_action[target_index] + adrenaline_move_increase
            } else {
              character_state.main_action[target_index] = character_state.main_action[target_index] + 1
            }
            extra_actions = extra_actions - 1
          }
          var adrenaline_object_target = {}
          adrenaline_object_target.extra_actions = data.extra_actions
          adrenaline_object_target.turn = 1
          character_state.special_effects[target_index].poisonous_adrenaline_target = adrenaline_object_target

          var adrenaline_object_user = {}
          adrenaline_object_user.cooldown = poisonous_adrenaline_cooldown
          character_state.special_effects[user_index].poisonous_adrenaline_user = adrenaline_object_user

          var message = user.name + " использует адреналиновый потоп. "  + target.name + " получает " + data.extra_actions[0] + " действий в этот ход, и " + data.extra_actions[1] + " в следующий. Это будет стоить жизней и выносливости, используйте с умом."
          pushToList(message)
          break;


      case 24: // кислотная граната
          character = character_detailed_info[user_index]

          character_state.main_action[user_index] = character_state.main_action[user_index] - 1
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          character_state.stamina[user_index] = character_state.stamina[user_index] - acid_bomb_stamina_cost

          var message = character.name + " бросает кислотную гранату. А они только купили новые доспехи..."
          pushToList(message)

          var acid_bomb_user = {}
          acid_bomb_user.cooldown = acid_bomb_cooldown
          character_state.special_effects[user_index].acid_bomb_user = acid_bomb_user

          apply_acid_bomb(data.position, acid_bomb_radius)

          break;

      case 25: // заминировать
        if (game_state.battle_mod == 1) {
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
        }

        if (!game_state.landmines.positions.includes(data.position)) {
          game_state.landmines.positions.push(data.position)
          game_state.landmines.knowers[data.position] = []
          game_state.landmines.knowers[data.position].push(data.player_name)
        }

          break;

      case 26: // взаимодействовать

          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] -= 1
          }
          character = character_detailed_info[user_index]

          if (data.interaction_type == "diffuse_landmine") {
            switch(data.outcome) {
              case "empty":
                  var message = "С чем " + character.name + " пытался взаимодействовать?"
                  pushToList(message)
                  break;
              case "fail":
                  var message = character.name + " попытался обезвредить мину, но не сумел."
                  pushToList(message)
                  break;
              case "success":
                  var mine_position = data.position
                  var cell = document.getElementById('cell_' + mine_position);
                  cell.src = fogOrPic(mine_position)
                  var index = game_state.landmines.positions.indexOf(mine_position)
                  if (index > -1) {
                    game_state.landmines.positions.splice(index,1)
                  }
                  game_state.landmines.knowers[mine_position] = []
                  var message = character.name + " запрещает мине взрываться!"
                  pushToList(message)
                  break;
              default:
                  console.log("Switch обевзрежения пошел не так")
              }
          } else if (data.interaction_type == "hackable_computer") {
            let index = data.position;
            switch(data.outcome) {
              case "already_hacked":
                  var message = "Компьютер, который " + character.name + " пытался взломать, уже был успешно взломан, а информация удалена.";
                  pushToList(message);
                  break;

              case "already_failed":
                  var message = "Протокол безопасности на компьютере, который " + character.name + " пытался взломать, уже был запущен ранее, а информация удалена. О вашей попытке могли узнать.";
                  pushToList(message);
                  break;
              case "failed":
                  game_state.obstacle_extra_info[index].hack_fails = 3; // fully failed
                  var message = "Запущен протокол безопасности на компьютере, который " + character.name + " пытался взломать. Вся информация удалена, отправлено уведомление о попытке взлома.";
                  pushToList(message);
                  break;
              case "one_fail":
                  if (game_state.obstacle_extra_info[index].hasOwnProperty("hack_fails")) {
                    game_state.obstacle_extra_info[index].hack_fails += 1
                  } else {
                    game_state.obstacle_extra_info[index].hack_fails = 1;
                  }
                  var message = character.name + " совершает неудачную попытку взлома. Осторожно, ваши действия могут быть замечены.";
                  pushToList(message);
                  break;

              case "one_success":
                  if (game_state.obstacle_extra_info[index].hasOwnProperty("hack_stage")) {
                    game_state.obstacle_extra_info[index].hack_stage += 1
                  } else {
                    game_state.obstacle_extra_info[index].hack_stage = 1;
                  }
                  var message = character.name + " продвигается в взломе базы данных. Прогресс: " + (33*game_state.obstacle_extra_info[index].hack_stage) + "%";
                  pushToList(message);
                  break;
              case "hacked":
                  game_state.obstacle_extra_info[index].hack_stage = 3; // fully hacked
                  var message = character.name + " удается прорваться через фаерволл компьютера, и он получает полный доступ к имеющимся данным.";
                  pushToList(message);
                  break;
            }
          } else {
            console.log("Unknown interaction");
          }
          break;

      case 27: // никотиновый удар
          character = character_detailed_info[user_index]
          var full_hp = HP_values[character.stamina]
          character_state.HP[user_index] = character_state.HP[user_index] - full_hp * tobacco_strike_hp_percentage
          character_state.attack_bonus[user_index] = character_state.attack_bonus[user_index] + tobacco_strike_bonus
          var tobacco_strike_object = {}
          tobacco_strike_object.cooldown = tobacco_strike_cooldown
          character_state.special_effects[user_index].tobacco_strike = tobacco_strike_object
          var message = character.name + " хорошечно затягивается. Берегитесь!"
          pushToList(message);
          break;

      case 28: // крученые пули
          var attacker = character_detailed_info[user_index]
          var target = character_detailed_info[data.target_id]
          if (game_state.battle_mod == 1) {
            character_state.main_action[user_index] = character_state.main_action[user_index] - 1
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
            character_state.stamina[user_index] = character_state.stamina[user_index] - curved_bullets_stamina_cost
          }

          if (data.cover_level > 0) {
            var cover_string = "Уровень укрытия: " + data.cover_level
          } else {
            var cover_string = ""
          }
          switch (data.outcome) {
            case "KD_block":
              var message = attacker.name + " пытается закрутить пулю в " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string
              pushToList(message)
              break;
            case "evaded":
              var message = attacker.name + " пытался закрутить пулю в " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string
              pushToList(message)
              if (target.special_type != 'rogue') {
                character_state.can_evade[data.target_id] = 0
              }
              break;
            case "damage_without_evasion":
              var message = attacker.name + " успешно закрутил пулю " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string
              pushToList(message)
              do_damage(data.target_id, data.damage_roll)
              break;
            case "damage_after_evasion":
              var message = attacker.name + " успешно закрутил пулю " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string
              pushToList(message)
              do_damage(data.target_id, data.damage_roll)
              character_state.can_evade[data.target_id] = 0
              break;
            case "full_crit":
              var message = attacker.name + " критически атакует " + target.name + "крученой пулей, не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string
              pushToList(message)
              do_damage(data.target_id, data.damage_roll)
              character_state.can_evade[data.target_id] = 0
              break;
            case "full_cover":
              var message = "Несмотря на попытку " + attacker.name + " обкрутить препятствие защищающее " + target.name + ", тот все равно находится в полном укрытии."
              pushToList(message)
              break;
            default:
              console.log("fucked up resolving damage")
              break;
          }
          break;

      case 29: // Прицелиться
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
          }
          var aim_object = {}
          character_state.special_effects[user_index].aim = aim_object
          break;

      case 30: // быстрая атака
      var attacker = character_detailed_info[user_index]
      var target = character_detailed_info[data.target_id]
      character_state.has_moved[user_index] = 1

      if (character_state.special_effects[user_index].hasOwnProperty("quick_attack_ready")) {
        delete character_state.special_effects[user_index].quick_attack_ready
      }

      if (game_state.battle_mod == 1) {
        character_state.stamina[user_index] = character_state.stamina[user_index] - stamina_attack_cost
        character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
      }

      if (data.cover_level > 0) {
        var cover_string = "Уровень укрытия: " + data.cover_level
      } else {
        var cover_string = ""
      }
      switch (data.outcome) {
        case "KD_block":
          var message = attacker.name + " быстро атакует " + target.name + " (" + data.attack_roll + "), но не пробивает броню. " + cover_string
          pushToList(message)
          break;
        case "evaded":
          var message = attacker.name + " быстро атакует " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + "). " + cover_string
          pushToList(message)
          if (target.special_type != 'rogue') {
            character_state.can_evade[data.target_id] = 0
          }
          break;
        case "damage_without_evasion":
          var message = attacker.name + " успешно быстро атакует " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться. Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          melee_penalty(data)
          break;
        case "damage_after_evasion":
          var message = attacker.name + " успешно быстро атакует " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "). Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          melee_penalty(data)
          break;
        case "full_crit":
          var message = attacker.name + " критически быстро атакует " + target.name + ", не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона. " + cover_string
          pushToList(message)
          do_damage(data.target_id, data.damage_roll)
          character_state.can_evade[data.target_id] = 0
          melee_penalty(data)
          break;
        case "full_cover":
          var message = attacker.name + " пытался быстро атаковать " + target.name + " но тот находится в полном укрытии."
          pushToList(message)
          break;
        default:
          console.log("fucked up resolving damage")
          break;
      }
          break;

      case 31: // служба спасения
        if (game_state.battle_mod == 1) {
          character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - safety_service_bonus_actions_cost
        }
        var savior = character_detailed_info[user_index]
        var target = character_detailed_info[data.target_id]
        var message = savior.name + " не даст в обиду " +  target.name
        pushToList(message)
        character_state.defensive_advantage[data.target_id] = character_state.defensive_advantage[data.target_id] + safety_service_defensive_advantage
        character_state.evade_bonus[data.target_id] = character_state.evade_bonus[data.target_id] + safety_service_evade_bonus

        var safety_service_target_object = {}
        safety_service_target_object.duration = safety_service_duration
        character_state.special_effects[data.target_id].safety_service_target = safety_service_target_object

        var safety_service_user_object = {}
        safety_service_user_object.cooldown = safety_service_cooldown
        character_state.special_effects[user_index].safety_service_user = safety_service_user_object
        break;

      case 32: // кальингалятор
        character = character_detailed_info[user_index]
        character_state.main_action[user_index] = character_state.main_action[user_index] - 1
        character_state.bonus_action[user_index] = character_state.bonus_action[user_index] - 1
        character_state.stamina[user_index] = character_state.stamina[user_index] - calingalator_stamina_cost

        var message = character.name + " устанавливает кальингалятор. Собирайтесь вокруг!."
        pushToList(message)

        var calingalator_object = {}
        calingalator_object.type = "calingalator"
        calingalator_object.position = data.position
        calingalator_object.duration = calingalator_duration
        calingalator_object.radius = calingalator_radius
        calingalator_object.flat_heal = calingalator_flat_heal
        calingalator_object.roll_heal = calingalator_roll_heal
        game_state.terrain_effects.push(calingalator_object)

        var calingalator_user = {}
        calingalator_user.cooldown = calingalator_skill_cooldown
        character_state.special_effects[user_index].calingalator_user = calingalator_user
          break;

      case 33: // бафф бельвет
          if (game_state.battle_mod == 1) {
            change_character_property("main_action", user_index, -1);
          }
          var target_id = data.target_id;

          var buffer = character_detailed_info[user_index]
          var target = character_detailed_info[target_id]

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

      case 34: // трансформация Бельвет
        var user =  character_detailed_info[user_index];
        for (let j = 0; j < data.rolled_buffs_targets.length; j++) {
          var target_id = data.rolled_buffs_targets[j];
          var rolled_buffs_array = data.rolled_buffs_outcomes[j];
          var i = 0;
          while (i < 5) {
            if (rolled_buffs_array[i] > 0) {
              rolled_buffs_array[i] -= 1;
              switch(i) {
                case 0: //strength
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
              i +=1;
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
        if (!(((my_role == 'player')&&(game_state.fog_state[char_position] == 1)) || (character_state.invisibility[user_index] != "all" && character_state.invisibility[user_index] != my_name))) {
          var to_cell = document.getElementById('cell_' + char_position);
          to_cell.src = get_object_picture(user_index);
        }
        var message = user.name + " открывает свою истинную сущность, получая " + data.total_upgrade + " усилений. Удачной охоты!";
        pushToList(message);
        break;

      case 35: // хук
        var user = character_detailed_info[user_index];
        var target = character_detailed_info[data.target_id];

        if (game_state.battle_mod == 1) {
          character_state.bonus_action[user_index] -= 1
        }

        var hook_user_object = {}
        hook_user_object.cooldown = hook_cooldown
        character_state.special_effects[user_index].hook_user = hook_user_object

        var hook_target_object = {}
        hook_target_object.duration = hook_duration
        hook_target_object.defensive_advantage = hook_defensive_advantage
        character_state.special_effects[data.target_id].hook_target = hook_target_object

        character_state.defensive_advantage[data.target_id] += hook_defensive_advantage;

        if (data.hook_possible) {
          forced_movement(data.old_position, data.new_position, data.target_id);
        }

        var message = user.name + " хукает " + target.name;
        pushToList(message);

        break;

      case 36: // punishing_strike
        var attacker = character_detailed_info[user_index]
        var target = character_detailed_info[data.target_id]
        if (game_state.battle_mod == 1) {
          character_state.main_action[user_index] -= 1
          character_state.bonus_action[user_index] -= 1
        }

        var punishing_strike_user_object = {}
        punishing_strike_user_object.cooldown = punishing_strike_cooldown
        character_state.special_effects[user_index].punishing_strike_user = punishing_strike_user_object

        switch (data.outcome) {
          case "KD_block":
            var message = attacker.name + " пытается покарать " + target.name + " (" + data.attack_roll + "), но не пробивает броню."
            pushToList(message)
            break;
          case "evaded":
            var message = attacker.name + " пытается покарать " + target.name + " (" + data.attack_roll + "), однако " + target.name + " удалось увернуться (" + data.evade_roll + ")."
            pushToList(message)
            if (target.special_type != 'rogue') {
              character_state.can_evade[data.target_id] = 0
            }
            break;
          case "damage_without_evasion":
            var message = attacker.name + " применяет карающий удар к " + target.name + " (" + data.attack_roll + "), который больше не может уворачиваться, нанося " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
          case "damage_after_evasion":
            var message = attacker.name + " применяет карающий удар к " + target.name + " (" + data.attack_roll + "), который не смог увернуться (" + data.evade_roll + "), нанося " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
          case "full_crit":
            var message = "Судный день наступил для " + target.name + ". " + attacker.name + " критически карает противника, не оставляя возможности увернуться. Атака наносит " + data.damage_roll + " урона."
            pushToList(message)
            do_damage(data.target_id, data.damage_roll)
            character_state.can_evade[data.target_id] = 0
            break;
          case "full_cover":
            var message = attacker.name + " пытался покарать " + target.name + " но тот находится в полном укрытии."
            pushToList(message)
            break;
          default:
            console.log("fucked up resolving punishment")
            break;
        }
        break;

      case 37: // прыжок
        receiveMoveOverall(data.movement_object, "jump");
        break;

      case 38: // carry
        if (!data.hasOwnProperty("carry_interrupt")) {
          if (game_state.battle_mod == 1) {
            character_state.bonus_action[user_index] -= carry_bonus_actions_cost
          }
          var carry_user = character_detailed_info[user_index]
          var carry_target = character_detailed_info[data.target_index]
          var message = carry_user.name + " будет оттаскивать " + carry_target.name
          pushToList(message)

          var carry_target_object = {}
          carry_target_object.carry_user_index = user_index
          character_state.special_effects[data.target_index].carry_target = carry_target_object

          var carry_user_object = {}
          carry_user_object.carry_target_index = data.target_index;
          carry_user_object.carry_distance_modifier = data.carry_distance_modifier;
          character_state.special_effects[user_index].carry_user = carry_user_object
        } else {
          carry_interruption(data.carry_user_index, data.carry_target_index);
        }
        break;

      case 39: // pass
        var to_index = data.landing_position;
        var from_index = data.ball_position;
        var ball_index = data.ball_index;
        if (game_state.board_state[to_index] == 0) {// pass to empty space
          delete character_state.special_effects[data.passer_index].carry_user;
          delete character_state.special_effects[ball_index].carry_target;
          receiveMoveBasicState(to_index, from_index, ball_index);
          receiveMoveImageState(to_index, from_index, ball_index);
          if (game_state.battle_mod == 1) {
            character_state.main_action[data.passer_index] -= 1;
          }
        }
        break;

      case 40: //belvet jump
        receiveMoveOverall(data.movement_object, "belvet_jump");
        deal_AOE_damage(data.damage_object_array, user_index);
        setCooldown(user_index, "belvet_jump", belvet_jump_cooldown);
        break;

        default:
          alert("Received unknown skill command")
      }

    } else if (data.command == 'new_round_response') {
      var message = "Начало нового раунда!"
      pushToList(message)

      for (let i = 1; i < character_state.can_evade.length; i++) {
        character = character_detailed_info[i]
        if (character !== undefined && character !== null && character_state.HP[i] !== null && character_state.HP[i] > 0) {
          move_and_actions_replenish(character, i);
          apply_tiredness(character, i);
          check_default_cooldowns(i);
          check_all_round_effects(i, character, data);
        }
      }

      apply_terrain_effects(data);
    } else if (data.command == 'battle_mod_response') {
      game_state.battle_mod = data.value
      if (game_state.battle_mod == 0) {
        var message = "Бой окончен! Наступил мир во всем мире"
      } else {
        var message = "Начало боя! Люди умирают, если их убить"
      }
      pushToList(message)
    } else if (data.command == 'resolve_attack_response') {
      receiveAttack_play_attack_sound(data.attack_type);
      receiveAttack_invisibility_end_check(data.invisibility_ended, data.attacker_id, data.attacker_position);
      receiveAttack_action_state(data.attacker_id);
      aim_over_check(data);
      quick_attack_check(data);
      move_reduction_check(data);
      var cover_string = receiveAttack_construct_cover_string(data.cover_level);
      receiveAttack_outcome_switch(data.attacker_id, data.target_id, data.outcome, data.attack_roll, data.evade_roll, data.damage_roll, data.attack_type, cover_string)
    } else if (data.command == 'attack_obstacle_response') {
      if (data.attack_type == "ranged") {
        var audio = gunshot_audio
      } else if (data.attack_type == "melee") {
        var audio = sword_audio
      } else {// default including energy and throwing
        var audio = suriken_audio
      }
      audio.play();

      var attacker = character_detailed_info[data.attacker_id]
      var target = obstacle_detailed_info[data.target_id]

      if (data.user_invisibility_ended == 1) {
        character_state.invisibility[data.attacker_id] = "all"
        var attacker_cell = document.getElementById('cell_' + data.attacker_position);
        attacker_cell.src = character_detailed_info[data.attacker_id].avatar;
      }

      character_state.has_moved[data.attacker_id] = 1

      if (game_state.battle_mod == 1) {
        character_state.stamina[data.attacker_id] = character_state.stamina[data.attacker_id] - stamina_attack_cost
        character_state.main_action[data.attacker_id] = character_state.main_action[data.attacker_id] - 1
      }

      if (data.hasOwnProperty("aim_over")) {
        delete character_state.special_effects[data.attacker_id].aim
      }

      if (data.hasOwnProperty("quick_attack_ready")) {
        character_state.special_effects[data.attacker_id].quick_attack_ready = true;
      }

      if (data.cover_level > 0) {
        var cover_string = "Уровень укрытия: " + data.cover_level
      } else {
        var cover_string = ""
      }

      switch (data.outcome) {
        case "full_cover":
          var message = attacker.name + " пытался разрушить " + target.name + " но атака не прошла через полное укрытие." + cover_string;
          pushToList(message)
          break;
        case "untouched":
          var message = attacker.name + " пытался разрушить " + target.name + " но атаке не хватило урона (" + data.damage + " нанесено). " + cover_string;
          pushToList(message)
          break;
        case "destroyed":
          var message = attacker.name + " разрушает " + target.name + " нанося " + data.damage + " урона. " + cover_string;
          pushToList(message)
          game_state.board_state[data.target_position] = 0;
          game_state.obstacle_extra_info[data.target_position] = null;
          if (!((my_role == 'player')&&(game_state.fog_state[data.target_position] == 1))) {
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
        character_state.bonus_action[data.character_number] = character_state.bonus_action[data.character_number] - 1
      }

      if (data.mines_detected.length > 0) {
        var message = data.character_name + " обнаруживает " + data.mines_detected.length + " мин рядом с собой"
        pushToList(message)
        for (let i = 0; i < data.mines_detected.length; i++) {
          var mine = data.mines_detected[i]
          game_state.landmines.knowers[mine].push(data.player_name)
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
for (let i = 1; i < MAX_ZONES; i++) {
  var current_option = $("<option>");
  current_option.text('Зона ' + i);
  current_option.val(i);
  zone_number_select.append(current_option);
}

var saves_select = $(SAVES_SELECT_SELECTOR);

var search_modificator = $(SEARCH_MODIFICATOR_SELECTOR);

var notifications_list = $(NOTIFICATIONS_LIST_SELECTOR);
for (let i = 0; i < CHAT_CASH; i++) {
  var current_element = $("<li>");
  current_element.attr('data-name', 'notifications_list_element_' + i);
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

span.onclick = function() {
  hide_modal();
}

span.style.display = 'none';

window.onclick = function(event) {
  if (event.target.id == skill_modal.attr('id')) {
    hide_modal();
  }
}

document.onkeydown = function (e) {
    var keyCode = e.keyCode;
    // w
    if(keyCode == 87) {
        w_onclick()
    } else if (keyCode == 65) { // a
      a_onclick()
    }
};

setInterval(reconnect, 15*1000)
