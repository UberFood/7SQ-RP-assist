var $ = window.jQuery;
var PLAYER_BUTTON_SELECTOR = '[data-name="sign_player_button"]';
var GM_BUTTON_SELECTOR = '[data-name="sign_gm_button"]';
var CREATE_CHAR_BUTTON_SELECTOR = '[data-name="create_char_button"]';

function signPlayer() {
  var username = document.getElementById('player_name').value;
  var role = 'player';

  sessionStorage.setItem('username', JSON.stringify(username));
  sessionStorage.setItem('user_role', JSON.stringify(role));

  window.location.href = "/game.html";
}

function signGM() {
  var username = document.getElementById('player_name').value;
  var password = document.getElementById('password').value;
  var role = 'gm';

  sessionStorage.setItem('username', JSON.stringify(username));
  sessionStorage.setItem('user_role', JSON.stringify(role));
  sessionStorage.setItem('gm_password', JSON.stringify(password));

  window.location.href = "/game.html";
}

function createChar() {
  var password = document.getElementById('password').value;
  var username = document.getElementById('player_name').value;
  
  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('username', JSON.stringify(username));

  window.location.href = "/character.html";
}

var player_button = $(PLAYER_BUTTON_SELECTOR);
player_button.on('click', signPlayer);

var gm_button = $(GM_BUTTON_SELECTOR);
gm_button.on('click', signGM);

var create_char_button = $(CREATE_CHAR_BUTTON_SELECTOR);
create_char_button.on('click', createChar);
