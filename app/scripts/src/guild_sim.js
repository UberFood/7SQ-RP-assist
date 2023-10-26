import socket from './ws-client';

var $ = window.jQuery;

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');
var my_name = JSON.parse(sessionStorage.getItem('username'));

var ADD_CHARACTER_BUTTON_SELECTOR = '[data-name="add_character_button"]';
var FIGHTERS_DISPLAY_SELECTOR = '[data-name="fighters_display"]';

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
		img.attr('height', '50px');
		img.attr('width', '50px');
		img.appendTo(fighters_display_container);
	}

});

var add_character_button = $(ADD_CHARACTER_BUTTON_SELECTOR);
add_character_button.on('click', addCharacter);

var fighters_display_container = $(FIGHTERS_DISPLAY_SELECTOR);
