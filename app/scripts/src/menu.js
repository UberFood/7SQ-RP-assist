var $ = window.jQuery;
var SIGNIN_BUTTON_SELECTOR = '[data-name="sign_in_button"]';
var CREATE_CHAR_BUTTON_SELECTOR = '[data-name="create_char_button"]';
var ROOM_NUMBER_SELECT_SELECTOR = '[data-name="room_number_select"]';
var ARMOR_CALCULATOR_BUTTON_SELECTOR = '[data-name="armor_calculator_button"]';
var GUILD_SIM_BUTTON_SELECTOR = '[data-name="guild_sim_button"]';
var ADMIN_CHECKBOX_SELECTOR = '[data-name="admin_checkbox"]';

var MAX_ROOMS = 2;

function signIn() {
  var username = document.getElementById('player_name').value;
  var room = room_number_select.val();
  if (admin_checkbox.is(':checked')) {
    var role = 'gm';
    var password = document.getElementById('password').value;
    sessionStorage.setItem('gm_password', JSON.stringify(password));
  } else {
    var role = 'player';
  }

  sessionStorage.setItem('username', JSON.stringify(username));
  sessionStorage.setItem('user_role', JSON.stringify(role));
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

function open_guild_sim() {
  var password = document.getElementById('password').value;
  var username = document.getElementById('player_name').value;

  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('username', JSON.stringify(username));

  window.location.href = "/guild_sim.html";
}

var sign_in_button = $(SIGNIN_BUTTON_SELECTOR);
sign_in_button.on('click', signIn);

var create_char_button = $(CREATE_CHAR_BUTTON_SELECTOR);
create_char_button.on('click', createChar);

var armor_calculator_button = $(ARMOR_CALCULATOR_BUTTON_SELECTOR);
armor_calculator_button.on('click', open_armor_calculator);

var guild_sim_button = $(GUILD_SIM_BUTTON_SELECTOR);
guild_sim_button.on('click', open_guild_sim);

var admin_checkbox = $(ADMIN_CHECKBOX_SELECTOR);

var room_number_select = $(ROOM_NUMBER_SELECT_SELECTOR);
for (let i = 1; i < MAX_ROOMS + 1; i++) {
  var current_option = $("<option>");
  current_option.text('Комната ' + i);
  current_option.val(i);
  room_number_select.append(current_option);
}
