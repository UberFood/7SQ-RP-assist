(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var $ = window.jQuery;
var PLAYER_BUTTON_SELECTOR = '[data-name="sign_player_button"]';
var GM_BUTTON_SELECTOR = '[data-name="sign_gm_button"]';
var CREATE_CHAR_BUTTON_SELECTOR = '[data-name="create_char_button"]';
var ROOM_NUMBER_SELECT_SELECTOR = '[data-name="room_number_select"]';
var ARMOR_CALCULATOR_BUTTON_SELECTOR = '[data-name="armor_calculator_button"]';
var GUILD_SIM_BUTTON_SELECTOR = '[data-name="guild_sim_button"]';

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

function open_guild_sim() {
  var password = document.getElementById('password').value;
  var username = document.getElementById('player_name').value;

  sessionStorage.setItem('gm_password', JSON.stringify(password));
  sessionStorage.setItem('username', JSON.stringify(username));

  window.location.href = "/guild_sim.html";
}

var player_button = $(PLAYER_BUTTON_SELECTOR);
player_button.on('click', signPlayer);

var gm_button = $(GM_BUTTON_SELECTOR);
gm_button.on('click', signGM);

var create_char_button = $(CREATE_CHAR_BUTTON_SELECTOR);
create_char_button.on('click', createChar);

var armor_calculator_button = $(ARMOR_CALCULATOR_BUTTON_SELECTOR);
armor_calculator_button.on('click', open_armor_calculator);

var guild_sim_button = $(GUILD_SIM_BUTTON_SELECTOR);
guild_sim_button.on('click', open_guild_sim);

var room_number_select = $(ROOM_NUMBER_SELECT_SELECTOR);
for (var i = 1; i < MAX_ROOMS + 1; i++) {
  var current_option = $("<option>");
  current_option.text('Комната ' + i);
  current_option.val(i);
  room_number_select.append(current_option);
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvbWVudS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxJQUFJLE9BQU8sTUFBZjtBQUNBLElBQUkseUJBQXlCLGtDQUE3QjtBQUNBLElBQUkscUJBQXFCLDhCQUF6QjtBQUNBLElBQUksOEJBQThCLGtDQUFsQztBQUNBLElBQUksOEJBQThCLGtDQUFsQztBQUNBLElBQUksbUNBQW1DLHVDQUF2QztBQUNBLElBQUksNEJBQTRCLGdDQUFoQzs7QUFFQSxJQUFJLFlBQVksQ0FBaEI7O0FBRUEsU0FBUyxVQUFULEdBQXNCO0FBQ3BCLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUMsS0FBdEQ7QUFDQSxNQUFJLE9BQU8sUUFBWDtBQUNBLE1BQUksT0FBTyxtQkFBbUIsR0FBbkIsRUFBWDs7QUFFQSxpQkFBZSxPQUFmLENBQXVCLFVBQXZCLEVBQW1DLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBbkM7QUFDQSxpQkFBZSxPQUFmLENBQXVCLFdBQXZCLEVBQW9DLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBcEM7QUFDQSxpQkFBZSxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBdEM7O0FBRUEsU0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLFlBQXZCO0FBQ0Q7O0FBRUQsU0FBUyxNQUFULEdBQWtCO0FBQ2hCLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUMsS0FBdEQ7QUFDQSxNQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLEtBQW5EO0FBQ0EsTUFBSSxPQUFPLG1CQUFtQixHQUFuQixFQUFYO0FBQ0EsTUFBSSxPQUFPLElBQVg7O0FBRUEsaUJBQWUsT0FBZixDQUF1QixVQUF2QixFQUFtQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQW5DO0FBQ0EsaUJBQWUsT0FBZixDQUF1QixXQUF2QixFQUFvQyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXBDO0FBQ0EsaUJBQWUsT0FBZixDQUF1QixhQUF2QixFQUFzQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXRDO0FBQ0EsaUJBQWUsT0FBZixDQUF1QixhQUF2QixFQUFzQyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQXRDOztBQUVBLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixZQUF2QjtBQUNEOztBQUVELFNBQVMsVUFBVCxHQUFzQjtBQUNwQixNQUFJLFdBQVcsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLEtBQW5EO0FBQ0EsTUFBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxLQUF0RDs7QUFFQSxpQkFBZSxPQUFmLENBQXVCLGFBQXZCLEVBQXNDLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBdEM7QUFDQSxpQkFBZSxPQUFmLENBQXVCLFVBQXZCLEVBQW1DLEtBQUssU0FBTCxDQUFlLFFBQWYsQ0FBbkM7O0FBRUEsU0FBTyxRQUFQLENBQWdCLElBQWhCLEdBQXVCLGlCQUF2QjtBQUNEOztBQUVELFNBQVMscUJBQVQsR0FBaUM7QUFDL0IsTUFBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFuRDtBQUNBLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUMsS0FBdEQ7O0FBRUEsaUJBQWUsT0FBZixDQUF1QixhQUF2QixFQUFzQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXRDO0FBQ0EsaUJBQWUsT0FBZixDQUF1QixVQUF2QixFQUFtQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQW5DOztBQUVBLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1Qix3QkFBdkI7QUFDRDs7QUFFRCxTQUFTLGNBQVQsR0FBMEI7QUFDeEIsTUFBSSxXQUFXLFNBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxLQUFuRDtBQUNBLE1BQUksV0FBVyxTQUFTLGNBQVQsQ0FBd0IsYUFBeEIsRUFBdUMsS0FBdEQ7O0FBRUEsaUJBQWUsT0FBZixDQUF1QixhQUF2QixFQUFzQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQXRDO0FBQ0EsaUJBQWUsT0FBZixDQUF1QixVQUF2QixFQUFtQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQW5DOztBQUVBLFNBQU8sUUFBUCxDQUFnQixJQUFoQixHQUF1QixpQkFBdkI7QUFDRDs7QUFFRCxJQUFJLGdCQUFnQixFQUFFLHNCQUFGLENBQXBCO0FBQ0EsY0FBYyxFQUFkLENBQWlCLE9BQWpCLEVBQTBCLFVBQTFCOztBQUVBLElBQUksWUFBWSxFQUFFLGtCQUFGLENBQWhCO0FBQ0EsVUFBVSxFQUFWLENBQWEsT0FBYixFQUFzQixNQUF0Qjs7QUFFQSxJQUFJLHFCQUFxQixFQUFFLDJCQUFGLENBQXpCO0FBQ0EsbUJBQW1CLEVBQW5CLENBQXNCLE9BQXRCLEVBQStCLFVBQS9COztBQUVBLElBQUksMEJBQTBCLEVBQUUsZ0NBQUYsQ0FBOUI7QUFDQSx3QkFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MscUJBQXBDOztBQUVBLElBQUksbUJBQW1CLEVBQUUseUJBQUYsQ0FBdkI7QUFDQSxpQkFBaUIsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsY0FBN0I7O0FBRUEsSUFBSSxxQkFBcUIsRUFBRSwyQkFBRixDQUF6QjtBQUNBLEtBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxZQUFZLENBQWhDLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3RDLE1BQUksaUJBQWlCLEVBQUUsVUFBRixDQUFyQjtBQUNBLGlCQUFlLElBQWYsQ0FBb0IsYUFBYSxDQUFqQztBQUNBLGlCQUFlLEdBQWYsQ0FBbUIsQ0FBbkI7QUFDQSxxQkFBbUIsTUFBbkIsQ0FBMEIsY0FBMUI7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciAkID0gd2luZG93LmpRdWVyeTtcclxudmFyIFBMQVlFUl9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNpZ25fcGxheWVyX2J1dHRvblwiXSc7XHJcbnZhciBHTV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInNpZ25fZ21fYnV0dG9uXCJdJztcclxudmFyIENSRUFURV9DSEFSX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiY3JlYXRlX2NoYXJfYnV0dG9uXCJdJztcclxudmFyIFJPT01fTlVNQkVSX1NFTEVDVF9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicm9vbV9udW1iZXJfc2VsZWN0XCJdJztcclxudmFyIEFSTU9SX0NBTENVTEFUT1JfQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJhcm1vcl9jYWxjdWxhdG9yX2J1dHRvblwiXSc7XHJcbnZhciBHVUlMRF9TSU1fQlVUVE9OX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJndWlsZF9zaW1fYnV0dG9uXCJdJztcclxuXHJcbnZhciBNQVhfUk9PTVMgPSAyO1xyXG5cclxuZnVuY3Rpb24gc2lnblBsYXllcigpIHtcclxuICB2YXIgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyX25hbWUnKS52YWx1ZTtcclxuICB2YXIgcm9sZSA9ICdwbGF5ZXInO1xyXG4gIHZhciByb29tID0gcm9vbV9udW1iZXJfc2VsZWN0LnZhbCgpO1xyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsIEpTT04uc3RyaW5naWZ5KHVzZXJuYW1lKSk7XHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9yb2xlJywgSlNPTi5zdHJpbmdpZnkocm9sZSkpO1xyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Jvb21fbnVtYmVyJywgSlNPTi5zdHJpbmdpZnkocm9vbSkpO1xyXG5cclxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2dhbWUuaHRtbFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaWduR00oKSB7XHJcbiAgdmFyIHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcl9uYW1lJykudmFsdWU7XHJcbiAgdmFyIHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykudmFsdWU7XHJcbiAgdmFyIHJvb20gPSByb29tX251bWJlcl9zZWxlY3QudmFsKCk7XHJcbiAgdmFyIHJvbGUgPSAnZ20nO1xyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsIEpTT04uc3RyaW5naWZ5KHVzZXJuYW1lKSk7XHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcl9yb2xlJywgSlNPTi5zdHJpbmdpZnkocm9sZSkpO1xyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2dtX3Bhc3N3b3JkJywgSlNPTi5zdHJpbmdpZnkocGFzc3dvcmQpKTtcclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyb29tX251bWJlcicsIEpTT04uc3RyaW5naWZ5KHJvb20pKTtcclxuXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9nYW1lLmh0bWxcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hhcigpIHtcclxuICB2YXIgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzc3dvcmQnKS52YWx1ZTtcclxuICB2YXIgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyX25hbWUnKS52YWx1ZTtcclxuXHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnZ21fcGFzc3dvcmQnLCBKU09OLnN0cmluZ2lmeShwYXNzd29yZCkpO1xyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VzZXJuYW1lJywgSlNPTi5zdHJpbmdpZnkodXNlcm5hbWUpKTtcclxuXHJcbiAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9jaGFyYWN0ZXIuaHRtbFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvcGVuX2FybW9yX2NhbGN1bGF0b3IoKSB7XHJcbiAgdmFyIHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bhc3N3b3JkJykudmFsdWU7XHJcbiAgdmFyIHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcl9uYW1lJykudmFsdWU7XHJcblxyXG4gIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2dtX3Bhc3N3b3JkJywgSlNPTi5zdHJpbmdpZnkocGFzc3dvcmQpKTtcclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VybmFtZScsIEpTT04uc3RyaW5naWZ5KHVzZXJuYW1lKSk7XHJcblxyXG4gIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvYXJtb3JfY2FsY3VsYXRvci5odG1sXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9wZW5fZ3VpbGRfc2ltKCkge1xyXG4gIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXNzd29yZCcpLnZhbHVlO1xyXG4gIHZhciB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXJfbmFtZScpLnZhbHVlO1xyXG5cclxuICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdnbV9wYXNzd29yZCcsIEpTT04uc3RyaW5naWZ5KHBhc3N3b3JkKSk7XHJcbiAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcm5hbWUnLCBKU09OLnN0cmluZ2lmeSh1c2VybmFtZSkpO1xyXG5cclxuICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL2d1aWxkX3NpbS5odG1sXCI7XHJcbn1cclxuXHJcbnZhciBwbGF5ZXJfYnV0dG9uID0gJChQTEFZRVJfQlVUVE9OX1NFTEVDVE9SKTtcclxucGxheWVyX2J1dHRvbi5vbignY2xpY2snLCBzaWduUGxheWVyKTtcclxuXHJcbnZhciBnbV9idXR0b24gPSAkKEdNX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmdtX2J1dHRvbi5vbignY2xpY2snLCBzaWduR00pO1xyXG5cclxudmFyIGNyZWF0ZV9jaGFyX2J1dHRvbiA9ICQoQ1JFQVRFX0NIQVJfQlVUVE9OX1NFTEVDVE9SKTtcclxuY3JlYXRlX2NoYXJfYnV0dG9uLm9uKCdjbGljaycsIGNyZWF0ZUNoYXIpO1xyXG5cclxudmFyIGFybW9yX2NhbGN1bGF0b3JfYnV0dG9uID0gJChBUk1PUl9DQUxDVUxBVE9SX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmFybW9yX2NhbGN1bGF0b3JfYnV0dG9uLm9uKCdjbGljaycsIG9wZW5fYXJtb3JfY2FsY3VsYXRvcik7XHJcblxyXG52YXIgZ3VpbGRfc2ltX2J1dHRvbiA9ICQoR1VJTERfU0lNX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmd1aWxkX3NpbV9idXR0b24ub24oJ2NsaWNrJywgb3Blbl9ndWlsZF9zaW0pO1xyXG5cclxudmFyIHJvb21fbnVtYmVyX3NlbGVjdCA9ICQoUk9PTV9OVU1CRVJfU0VMRUNUX1NFTEVDVE9SKTtcclxuZm9yIChsZXQgaSA9IDE7IGkgPCBNQVhfUk9PTVMgKyAxOyBpKyspIHtcclxuICB2YXIgY3VycmVudF9vcHRpb24gPSAkKFwiPG9wdGlvbj5cIik7XHJcbiAgY3VycmVudF9vcHRpb24udGV4dCgn0JrQvtC80L3QsNGC0LAgJyArIGkpO1xyXG4gIGN1cnJlbnRfb3B0aW9uLnZhbChpKTtcclxuICByb29tX251bWJlcl9zZWxlY3QuYXBwZW5kKGN1cnJlbnRfb3B0aW9uKTtcclxufVxyXG4iXX0=
