import socket from './ws-client';

var $ = window.jQuery;

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');
var my_name = JSON.parse(sessionStorage.getItem('username'));

var ADD_CHARACTER_BUTTON_SELECTOR = '[data-name="add_character_button"]';
var FIGHTERS_DISPLAY_SELECTOR = '[data-name="fighters_display"]';
var CHARACTER_DISPLAY_SELECTOR = '[data-name="character_display"]';
var FIGHTERS_SELECT_SELECTOR = '[data-name="fighters_select"]';
var ADD_FIGHTER_BUTTON_SELECTOR = '[data-name="add_fighter_button"]';

var character_list = [];
var character_detailed_info = [];

function addCharacter() {
	var name_string = document.getElementById("name").value;
	var avatar = document.getElementById("avatar").value;
  avatar = '/images/' + avatar;
	var strength_string = document.getElementById("strength").value;
	var stamina_string = document.getElementById("stamina").value;
	var speed_string = document.getElementById("speed").value;
	var intelligence_string = document.getElementById("intelligence").value;

	let character = { name: name_string, avatar: avatar, strength: strength_string, stamina: stamina_string, speed: speed_string, intelligence: intelligence_string};

  var toSend = {};
  toSend.command = 'guild_sim_new_char';
  toSend.character = character;
  socket.sendMessage(toSend);
  document.location.reload();
}

function select_character(character_number) {
	clear_containers();
	var character = character_detailed_info[character_number];
	let name = character.name;
	let avatar = character.avatar;

	var name_display = document.createElement("h2");
	name_display.innerHTML = name;

	var avatar_container = document.createElement("div");
	var avatar_display = document.createElement("IMG");
	avatar_display.src = avatar;
	avatar_display.style.width = '250px';
	avatar_display.style.height = '250px';

	avatar_container.appendChild(avatar_display)

	var strength_display = document.createElement("h2");
	strength_display.innerHTML = "Cила: " + character.strength;

	var stamina_display = document.createElement("h2");
	stamina_display.innerHTML = "Телосложение: " + character.stamina;

	var speed_display = document.createElement("h2");
	speed_display.innerHTML = "Скорость: " + character.speed;

	var intelligence_display = document.createElement("h2");
	intelligence_display.innerHTML = "Интеллект: " + character.intelligence;

	character_info_container.append(name_display);
	character_info_container.append(avatar_container);
	character_info_container.append(strength_display);
	character_info_container.append(stamina_display);
	character_info_container.append(speed_display);
	character_info_container.append(intelligence_display);
}

function addFighterToTeam(team) {
	console.log(team)
}

function clear_containers() {
	character_info_container.html("");
}

socket.init(SERVER_ADDRESS);

socket.registerOpenHandler(() => {
  var toSend = {};
  toSend.command = 'guild_sim_init';
  socket.sendMessage(toSend);
});

socket.registerMessageHandler((data) => {
  console.log(data);
	character_list = data.character_list;
	character_detailed_info = data.character_detailed_info;

	for (let i = 0; i < character_list.length; i++) {
		var character = character_detailed_info[i]
		var query_string = '<img> id="fighter_image_' + i + '"'
		var img = $(query_string)
		img.attr('src', character.avatar);
		img.attr('height', '100px');
		img.attr('width', '100px');
		img.click(function() {
			select_character(i);
		});
		img.appendTo(fighters_display_container);

		var option = $("<option>");
		option.html(character.name);
		option.attr("value", i);
		fighters_select.append(option)
	}

});

var add_character_button = $(ADD_CHARACTER_BUTTON_SELECTOR);
add_character_button.on('click', addCharacter);

var add_fighter_button = $(ADD_FIGHTER_BUTTON_SELECTOR);
add_fighter_button.on('click', function(event) {
	addFighterToTeam(event.target.getAttribute('team'));
});

var fighters_display_container = $(FIGHTERS_DISPLAY_SELECTOR);

var character_info_container = $(CHARACTER_DISPLAY_SELECTOR);

var fighters_select = $(FIGHTERS_SELECT_SELECTOR);
