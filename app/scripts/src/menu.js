var $ = window.jQuery;
var PLAYER_BUTTON_SELECTOR = '[data-name="sign_player_button"]';
var GM_BUTTON_SELECTOR = '[data-name="sign_gm_button"]';
var CREATE_CHAR_BUTTON_SELECTOR = '[data-name="create_char_button"]';
var ROOM_NUMBER_SELECT_SELECTOR = '[data-name="room_number_select"]';
var ARMOR_CALCULATOR_BUTTON_SELECTOR = '[data-name="armor_calculator_button"]';

var MAX_ROOMS = 2;

function signPlayer() {
  var username = document.getElementById('player_name').value;
  var role = 'player';
  var room = room_number_select.val();

  sessionStorage.setItem('username', JSON.stringify(username));
  sessionStorage.setItem('user_role', JSON.stringify(role));
  sessionStorage.setItem('room_number', JSON.stringify(room));

  window.location.href = "/game.html";
}

function signGM() {
  var username = document.getElementById('player_name').value;
  var password = document.getElementById('password').value;
  var room = room_number_select.val();
  var role = 'gm';

  sessionStorage.setItem('username', JSON.stringify(username));
  sessionStorage.setItem('user_role', JSON.stringify(role));
  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('room_number', JSON.stringify(room));

  window.location.href = "/game.html";
}

function createChar() {
  var password = document.getElementById('password').value;
  var username = document.getElementById('player_name').value;

  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('username', JSON.stringify(username));

  window.location.href = "/character.html";
}

function open_armor_calculator() {
  var password = document.getElementById('password').value;
  var username = document.getElementById('player_name').value;

  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('username', JSON.stringify(username));

  window.location.href = "/armor_calculator.html";
}

var player_button = $(PLAYER_BUTTON_SELECTOR);
player_button.on('click', signPlayer);

var gm_button = $(GM_BUTTON_SELECTOR);
gm_button.on('click', signGM);

var create_char_button = $(CREATE_CHAR_BUTTON_SELECTOR);
create_char_button.on('click', createChar);

var armor_calculator_button = $(ARMOR_CALCULATOR_BUTTON_SELECTOR);
armor_calculator_button.on('click', open_armor_calculator);

var room_number_select = $(ROOM_NUMBER_SELECT_SELECTOR);
for (let i = 1; i < MAX_ROOMS + 1; i++) {
  var current_option = $("<option>");
  current_option.text('Комната ' + i);
  current_option.val(i);
  room_number_select.append(current_option);
}
