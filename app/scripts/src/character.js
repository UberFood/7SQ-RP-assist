import socket from './ws-client';

var $ = window.jQuery;

var SERVER_ADDRESS = location.origin.replace(/^http/, 'ws');
var my_name = JSON.parse(sessionStorage.getItem('username'));

var ADD_CHARACTER_BUTTON_SELECTOR = '[data-name="add_character_button"]';

function addCharacter() {
	var name_string = document.getElementById("name").value;
	var avatar = document.getElementById("avatar").value;
  avatar = '/images/' + avatar;
	var strength_string = document.getElementById("strength").value;
	var stamina_string = document.getElementById("stamina").value;
	var agility_string = document.getElementById("agility").value;
	var intelligence_string = document.getElementById("intelligence").value;

	let character = { name: name_string, avatar: avatar, strength: strength_string, stamina: stamina_string, agility: agility_string, intelligence: intelligence_string};

  var toSend = {};
  toSend.command = 'new_character_profile';
  toSend.character = character;
  socket.sendMessage(toSend);
  document.location.reload();
}

socket.init(SERVER_ADDRESS);

socket.registerOpenHandler(() => {
  var toSend = {};
  toSend.command = 'add_character_permission';
  toSend.from_name = my_name;
  toSend.password = JSON.parse(sessionStorage.getItem('gm_password'));
  socket.sendMessage(toSend);
});

socket.registerMessageHandler((data) => {
  console.log(data);
  if (data.to_name == my_name) {
    if (data.command == 'add_character_permission_server') {
      if (data.isValid == 0) {
        alert('Нарушаем');
        window.location.href = "/";
      }
    }
  }

});

var add_character_button = $(ADD_CHARACTER_BUTTON_SELECTOR);
add_character_button.on('click', addCharacter);
