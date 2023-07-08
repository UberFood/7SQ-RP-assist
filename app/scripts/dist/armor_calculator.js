(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var $ = window.jQuery;
var KD_BUTTON_SELECTOR = '[data-name="KD_button"]';
var RESIST_BUTTON_SELECTOR = '[data-name="resist_button"]';
var MOVE_BUTTON_SELECTOR = '[data-name="move_button"]';
var DODGE_BUTTON_SELECTOR = '[data-name="dodge_button"]';

var KD_LVL_SELECTOR = '[data-name="KD_lvl"]';
var RESIST_LVL_SELECTOR = '[data-name="resist_lvl"]';
var MOVE_LVL_SELECTOR = '[data-name="move_lvl"]';
var DODGE_LVL_SELECTOR = '[data-name="dodge_lvl"]';

var KD_PRICE_SELECTOR = '[data-name="KD_price"]';
var RESIST_PRICE_SELECTOR = '[data-name="resist_price"]';
var MOVE_PRICE_SELECTOR = '[data-name="move_price"]';
var DODGE_PRICE_SELECTOR = '[data-name="dodge_price"]';

var TOTAL_PRICE_SELECTOR = '[data-name="total_price"]';

var module_scale = 1.2;
var specialization_scale = 2;

var initial_KD = 10;
var initial_resist = 0;
var initial_move = 0;
var initial_dodge = 0;

var initial_KD_price = 50;
var initial_resist_price = 50;
var initial_move_price = 50;
var initial_dodge_price = 50;

var step_KD = 1;
var step_resist = 2.5;
var step_move = 2.5;
var step_dodge = 1;

var current_KD = initial_KD;
var current_resist = initial_resist;
var current_move = initial_move;
var current_dodge = initial_dodge;

var current_KD_price = initial_KD_price;
var current_resist_price = initial_resist_price;
var current_move_price = initial_move_price;
var current_dodge_price = initial_dodge_price;

var total_cost = 0;

function update_total_cost(price) {
  total_cost = total_cost + price;
  total_price_entry.html("Общая стоимость: " + total_cost.toString());
}

function update_price_display() {
  KD_price.html("Цена апгрейда: " + current_KD_price.toString());
  resist_price.html("Цена апгрейда: " + current_resist_price.toString());
  move_price.html("Цена апгрейда: " + current_move_price.toString());
  dodge_price.html("Цена апгрейда: " + current_dodge_price.toString());
}

function apply_module_scale() {
  current_KD_price = parseInt(current_KD_price * module_scale);
  current_resist_price = parseInt(current_resist_price * module_scale);
  current_move_price = parseInt(current_move_price * module_scale);
  current_dodge_price = parseInt(current_dodge_price * module_scale);
}

function increase_KD() {
  current_KD = current_KD + step_KD;
  KD_lvl.html("КД: " + current_KD.toString());

  update_total_cost(current_KD_price);

  current_KD_price = current_KD_price * specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_resist() {
  current_resist = current_resist + step_resist;
  resist_lvl.html("Милли резист: " + current_resist.toString() + "%");

  update_total_cost(current_resist_price);

  current_resist_price = current_resist_price * specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_move() {
  current_move = current_move + step_move;
  move_lvl.html("Стрелковый резист: " + current_move.toString());

  update_total_cost(current_move_price);

  current_move_price = current_move_price * specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_dodge() {
  current_dodge = current_dodge + step_dodge;
  dodge_lvl.html("Уворот: " + current_dodge.toString());

  update_total_cost(current_dodge_price);

  current_dodge_price = current_dodge_price * specialization_scale;
  apply_module_scale();

  update_price_display();
}

var KD_button = $(KD_BUTTON_SELECTOR);
KD_button.on('click', increase_KD);

var resist_button = $(RESIST_BUTTON_SELECTOR);
resist_button.on('click', increase_resist);

var move_button = $(MOVE_BUTTON_SELECTOR);
move_button.on('click', increase_move);

var dodge_button = $(DODGE_BUTTON_SELECTOR);
dodge_button.on('click', increase_dodge);

var KD_lvl = $(KD_LVL_SELECTOR);
KD_lvl.html("КД: " + current_KD.toString());
var resist_lvl = $(RESIST_LVL_SELECTOR);
resist_lvl.html("Милли резист: " + current_resist.toString() + "%");
var move_lvl = $(MOVE_LVL_SELECTOR);
move_lvl.html("Стрелковый резист: " + current_move.toString());
var dodge_lvl = $(DODGE_LVL_SELECTOR);
dodge_lvl.html("Уворот: " + current_dodge.toString());

var KD_price = $(KD_PRICE_SELECTOR);
KD_price.html("Цена апгрейда: " + current_KD_price.toString());
var resist_price = $(RESIST_PRICE_SELECTOR);
resist_price.html("Цена апгрейда: " + current_resist_price.toString());
var move_price = $(MOVE_PRICE_SELECTOR);
move_price.html("Цена апгрейда: " + current_move_price.toString());
var dodge_price = $(DODGE_PRICE_SELECTOR);
dodge_price.html("Цена апгрейда: " + current_dodge_price.toString());

var total_price_entry = $(TOTAL_PRICE_SELECTOR);
total_price_entry.html("Общая стоимость: " + total_cost.toString());

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXJtb3JfY2FsY3VsYXRvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxJQUFJLE9BQU8sTUFBZjtBQUNBLElBQUkscUJBQXFCLHlCQUF6QjtBQUNBLElBQUkseUJBQXlCLDZCQUE3QjtBQUNBLElBQUksdUJBQXVCLDJCQUEzQjtBQUNBLElBQUksd0JBQXdCLDRCQUE1Qjs7QUFFQSxJQUFJLGtCQUFrQixzQkFBdEI7QUFDQSxJQUFJLHNCQUFzQiwwQkFBMUI7QUFDQSxJQUFJLG9CQUFvQix3QkFBeEI7QUFDQSxJQUFJLHFCQUFxQix5QkFBekI7O0FBRUEsSUFBSSxvQkFBb0Isd0JBQXhCO0FBQ0EsSUFBSSx3QkFBd0IsNEJBQTVCO0FBQ0EsSUFBSSxzQkFBc0IsMEJBQTFCO0FBQ0EsSUFBSSx1QkFBdUIsMkJBQTNCOztBQUVBLElBQUksdUJBQXVCLDJCQUEzQjs7QUFFQSxJQUFJLGVBQWUsR0FBbkI7QUFDQSxJQUFJLHVCQUF1QixDQUEzQjs7QUFFQSxJQUFJLGFBQWEsRUFBakI7QUFDQSxJQUFJLGlCQUFpQixDQUFyQjtBQUNBLElBQUksZUFBZSxDQUFuQjtBQUNBLElBQUksZ0JBQWdCLENBQXBCOztBQUVBLElBQUksbUJBQW1CLEVBQXZCO0FBQ0EsSUFBSSx1QkFBdUIsRUFBM0I7QUFDQSxJQUFJLHFCQUFxQixFQUF6QjtBQUNBLElBQUksc0JBQXNCLEVBQTFCOztBQUVBLElBQUksVUFBVSxDQUFkO0FBQ0EsSUFBSSxjQUFjLEdBQWxCO0FBQ0EsSUFBSSxZQUFZLEdBQWhCO0FBQ0EsSUFBSSxhQUFhLENBQWpCOztBQUVBLElBQUksYUFBYSxVQUFqQjtBQUNBLElBQUksaUJBQWlCLGNBQXJCO0FBQ0EsSUFBSSxlQUFlLFlBQW5CO0FBQ0EsSUFBSSxnQkFBZ0IsYUFBcEI7O0FBRUEsSUFBSSxtQkFBbUIsZ0JBQXZCO0FB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OztBQUVBLElBQUksV0FBVyxFQUFFLGlCQUFGLENBQWY7QUFDQSxTQUFTLElBQVQsQ0FBYyxvQkFBb0IsaUJBQWlCLFFBQWpCLEVBQWxDO0FBQ0EsSUFBSSxlQUFlLEVBQUUscUJBQUYsQ0FBbkI7QUFDQSxhQUFhLElBQWIsQ0FBa0Isb0JBQW9CLHFCQUFxQixRQUFyQixFQUF0QztBQUNBLElBQUksYUFBYSxFQUFFLG1CQUFGLENBQWpCO0FBQ0EsV0FBVyxJQUFYLENBQWdCLG9CQUFvQixtQkFBbUIsUUFBbkIsRUFBcEM7QUFDQSxJQUFJLGNBQWMsRUFBRSxvQkFBRixDQUFsQjtBQUNBLFlBQVksSUFBWixDQUFpQixvQkFBb0Isb0JBQW9CLFFBQXBCLEVBQXJDOztBQUVBLElBQUksb0JBQW9CLEVBQUUsb0JBQUYsQ0FBeEI7QUFDQSxrQkFBa0IsSUFBbEIsQ0FBdUIsc0JBQXNCLFdBQVcsUUFBWCxFQUE3QyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciAkID0gd2luZG93LmpRdWVyeTtcclxudmFyIEtEX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiS0RfYnV0dG9uXCJdJztcclxudmFyIFJFU0lTVF9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cInJlc2lzdF9idXR0b25cIl0nO1xyXG52YXIgTU9WRV9CVVRUT05fU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm1vdmVfYnV0dG9uXCJdJztcclxudmFyIERPREdFX0JVVFRPTl9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwiZG9kZ2VfYnV0dG9uXCJdJztcclxuXHJcbnZhciBLRF9MVkxfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIktEX2x2bFwiXSc7XHJcbnZhciBSRVNJU1RfTFZMX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJyZXNpc3RfbHZsXCJdJztcclxudmFyIE1PVkVfTFZMX1NFTEVDVE9SID0gJ1tkYXRhLW5hbWU9XCJtb3ZlX2x2bFwiXSc7XHJcbnZhciBET0RHRV9MVkxfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImRvZGdlX2x2bFwiXSc7XHJcblxyXG52YXIgS0RfUFJJQ0VfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIktEX3ByaWNlXCJdJztcclxudmFyIFJFU0lTVF9QUklDRV9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwicmVzaXN0X3ByaWNlXCJdJztcclxudmFyIE1PVkVfUFJJQ0VfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cIm1vdmVfcHJpY2VcIl0nO1xyXG52YXIgRE9ER0VfUFJJQ0VfU0VMRUNUT1IgPSAnW2RhdGEtbmFtZT1cImRvZGdlX3ByaWNlXCJdJztcclxuXHJcbnZhciBUT1RBTF9QUklDRV9TRUxFQ1RPUiA9ICdbZGF0YS1uYW1lPVwidG90YWxfcHJpY2VcIl0nO1xyXG5cclxudmFyIG1vZHVsZV9zY2FsZSA9IDEuMjtcclxudmFyIHNwZWNpYWxpemF0aW9uX3NjYWxlID0gMjtcclxuXHJcbnZhciBpbml0aWFsX0tEID0gMTA7XHJcbnZhciBpbml0aWFsX3Jlc2lzdCA9IDA7XHJcbnZhciBpbml0aWFsX21vdmUgPSAwO1xyXG52YXIgaW5pdGlhbF9kb2RnZSA9IDA7XHJcblxyXG52YXIgaW5pdGlhbF9LRF9wcmljZSA9IDUwO1xyXG52YXIgaW5pdGlhbF9yZXNpc3RfcHJpY2UgPSA1MDtcclxudmFyIGluaXRpYWxfbW92ZV9wcmljZSA9IDUwO1xyXG52YXIgaW5pdGlhbF9kb2RnZV9wcmljZSA9IDUwO1xyXG5cclxudmFyIHN0ZXBfS0QgPSAxO1xyXG52YXIgc3RlcF9yZXNpc3QgPSAyLjU7XHJcbnZhciBzdGVwX21vdmUgPSAyLjU7XHJcbnZhciBzdGVwX2RvZGdlID0gMTtcclxuXHJcbnZhciBjdXJyZW50X0tEID0gaW5pdGlhbF9LRDtcclxudmFyIGN1cnJlbnRfcmVzaXN0ID0gaW5pdGlhbF9yZXNpc3Q7XHJcbnZhciBjdXJyZW50X21vdmUgPSBpbml0aWFsX21vdmU7XHJcbnZhciBjdXJyZW50X2RvZGdlID0gaW5pdGlhbF9kb2RnZTtcclxuXHJcbnZhciBjdXJyZW50X0tEX3ByaWNlID0gaW5pdGlhbF9LRF9wcmljZTtcclxudmFyIGN1cnJlbnRfcmVzaXN0X3ByaWNlID0gaW5pdGlhbF9yZXNpc3RfcHJpY2U7XHJcbnZhciBjdXJyZW50X21vdmVfcHJpY2UgPSBpbml0aWFsX21vdmVfcHJpY2U7XHJcbnZhciBjdXJyZW50X2RvZGdlX3ByaWNlID0gaW5pdGlhbF9kb2RnZV9wcmljZTtcclxuXHJcbnZhciB0b3RhbF9jb3N0ID0gMDtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZV90b3RhbF9jb3N0KHByaWNlKSB7XHJcbiAgdG90YWxfY29zdCA9IHRvdGFsX2Nvc3QgKyBwcmljZTtcclxuICB0b3RhbF9wcmljZV9lbnRyeS5odG1sKFwi0J7QsdGJ0LDRjyDRgdGC0L7QuNC80L7RgdGC0Yw6IFwiICsgdG90YWxfY29zdC50b1N0cmluZygpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlX3ByaWNlX2Rpc3BsYXkoKSB7XHJcbiAgS0RfcHJpY2UuaHRtbChcItCm0LXQvdCwINCw0L/Qs9GA0LXQudC00LA6IFwiICsgY3VycmVudF9LRF9wcmljZS50b1N0cmluZygpKVxyXG4gIHJlc2lzdF9wcmljZS5odG1sKFwi0KbQtdC90LAg0LDQv9Cz0YDQtdC50LTQsDogXCIgKyBjdXJyZW50X3Jlc2lzdF9wcmljZS50b1N0cmluZygpKVxyXG4gIG1vdmVfcHJpY2UuaHRtbChcItCm0LXQvdCwINCw0L/Qs9GA0LXQudC00LA6IFwiICsgY3VycmVudF9tb3ZlX3ByaWNlLnRvU3RyaW5nKCkpXHJcbiAgZG9kZ2VfcHJpY2UuaHRtbChcItCm0LXQvdCwINCw0L/Qs9GA0LXQudC00LA6IFwiICsgY3VycmVudF9kb2RnZV9wcmljZS50b1N0cmluZygpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseV9tb2R1bGVfc2NhbGUoKSB7XHJcbiAgY3VycmVudF9LRF9wcmljZSA9IHBhcnNlSW50KGN1cnJlbnRfS0RfcHJpY2UqbW9kdWxlX3NjYWxlKTtcclxuICBjdXJyZW50X3Jlc2lzdF9wcmljZSA9IHBhcnNlSW50KGN1cnJlbnRfcmVzaXN0X3ByaWNlKm1vZHVsZV9zY2FsZSk7XHJcbiAgY3VycmVudF9tb3ZlX3ByaWNlID0gcGFyc2VJbnQoY3VycmVudF9tb3ZlX3ByaWNlKm1vZHVsZV9zY2FsZSk7XHJcbiAgY3VycmVudF9kb2RnZV9wcmljZSA9IHBhcnNlSW50KGN1cnJlbnRfZG9kZ2VfcHJpY2UqbW9kdWxlX3NjYWxlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5jcmVhc2VfS0QoKSB7XHJcbiAgY3VycmVudF9LRCA9IGN1cnJlbnRfS0QgKyBzdGVwX0tEO1xyXG4gIEtEX2x2bC5odG1sKFwi0JrQlDogXCIgKyBjdXJyZW50X0tELnRvU3RyaW5nKCkpXHJcblxyXG4gIHVwZGF0ZV90b3RhbF9jb3N0KGN1cnJlbnRfS0RfcHJpY2UpXHJcblxyXG4gIGN1cnJlbnRfS0RfcHJpY2UgPSBjdXJyZW50X0tEX3ByaWNlKnNwZWNpYWxpemF0aW9uX3NjYWxlO1xyXG4gIGFwcGx5X21vZHVsZV9zY2FsZSgpO1xyXG5cclxuICB1cGRhdGVfcHJpY2VfZGlzcGxheSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbmNyZWFzZV9yZXNpc3QoKSB7XHJcbiAgY3VycmVudF9yZXNpc3QgPSBjdXJyZW50X3Jlc2lzdCArIHN0ZXBfcmVzaXN0O1xyXG4gIHJlc2lzdF9sdmwuaHRtbChcItCc0LjQu9C70Lgg0YDQtdC30LjRgdGCOiBcIiArIGN1cnJlbnRfcmVzaXN0LnRvU3RyaW5nKCkgKyBcIiVcIilcclxuXHJcbiAgdXBkYXRlX3RvdGFsX2Nvc3QoY3VycmVudF9yZXNpc3RfcHJpY2UpXHJcblxyXG4gIGN1cnJlbnRfcmVzaXN0X3ByaWNlID0gY3VycmVudF9yZXNpc3RfcHJpY2Uqc3BlY2lhbGl6YXRpb25fc2NhbGU7XHJcbiAgYXBwbHlfbW9kdWxlX3NjYWxlKCk7XHJcblxyXG4gIHVwZGF0ZV9wcmljZV9kaXNwbGF5KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlYXNlX21vdmUoKSB7XHJcbiAgY3VycmVudF9tb3ZlID0gY3VycmVudF9tb3ZlICsgc3RlcF9tb3ZlO1xyXG4gIG1vdmVfbHZsLmh0bWwoXCLQodGC0YDQtdC70LrQvtCy0YvQuSDRgNC10LfQuNGB0YI6IFwiICsgY3VycmVudF9tb3ZlLnRvU3RyaW5nKCkpXHJcblxyXG4gIHVwZGF0ZV90b3RhbF9jb3N0KGN1cnJlbnRfbW92ZV9wcmljZSlcclxuXHJcbiAgY3VycmVudF9tb3ZlX3ByaWNlID0gY3VycmVudF9tb3ZlX3ByaWNlKnNwZWNpYWxpemF0aW9uX3NjYWxlO1xyXG4gIGFwcGx5X21vZHVsZV9zY2FsZSgpO1xyXG5cclxuICB1cGRhdGVfcHJpY2VfZGlzcGxheSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbmNyZWFzZV9kb2RnZSgpIHtcclxuICBjdXJyZW50X2RvZGdlID0gY3VycmVudF9kb2RnZSArIHN0ZXBfZG9kZ2U7XHJcbiAgZG9kZ2VfbHZsLmh0bWwoXCLQo9Cy0L7RgNC+0YI6IFwiICsgY3VycmVudF9kb2RnZS50b1N0cmluZygpKVxyXG5cclxuICB1cGRhdGVfdG90YWxfY29zdChjdXJyZW50X2RvZGdlX3ByaWNlKVxyXG5cclxuICBjdXJyZW50X2RvZGdlX3ByaWNlID0gY3VycmVudF9kb2RnZV9wcmljZSpzcGVjaWFsaXphdGlvbl9zY2FsZTtcclxuICBhcHBseV9tb2R1bGVfc2NhbGUoKTtcclxuXHJcbiAgdXBkYXRlX3ByaWNlX2Rpc3BsYXkoKTtcclxufVxyXG5cclxuXHJcbnZhciBLRF9idXR0b24gPSAkKEtEX0JVVFRPTl9TRUxFQ1RPUik7XHJcbktEX2J1dHRvbi5vbignY2xpY2snLCBpbmNyZWFzZV9LRCk7XHJcblxyXG52YXIgcmVzaXN0X2J1dHRvbiA9ICQoUkVTSVNUX0JVVFRPTl9TRUxFQ1RPUik7XHJcbnJlc2lzdF9idXR0b24ub24oJ2NsaWNrJywgaW5jcmVhc2VfcmVzaXN0KTtcclxuXHJcbnZhciBtb3ZlX2J1dHRvbiA9ICQoTU9WRV9CVVRUT05fU0VMRUNUT1IpO1xyXG5tb3ZlX2J1dHRvbi5vbignY2xpY2snLCBpbmNyZWFzZV9tb3ZlKTtcclxuXHJcbnZhciBkb2RnZV9idXR0b24gPSAkKERPREdFX0JVVFRPTl9TRUxFQ1RPUik7XHJcbmRvZGdlX2J1dHRvbi5vbignY2xpY2snLCBpbmNyZWFzZV9kb2RnZSk7XHJcblxyXG52YXIgS0RfbHZsID0gJChLRF9MVkxfU0VMRUNUT1IpO1xyXG5LRF9sdmwuaHRtbChcItCa0JQ6IFwiICsgY3VycmVudF9LRC50b1N0cmluZygpKVxyXG52YXIgcmVzaXN0X2x2bCA9ICQoUkVTSVNUX0xWTF9TRUxFQ1RPUik7XHJcbnJlc2lzdF9sdmwuaHRtbChcItCc0LjQu9C70Lgg0YDQtdC30LjRgdGCOiBcIiArIGN1cnJlbnRfcmVzaXN0LnRvU3RyaW5nKCkgKyBcIiVcIilcclxudmFyIG1vdmVfbHZsID0gJChNT1ZFX0xWTF9TRUxFQ1RPUik7XHJcbm1vdmVfbHZsLmh0bWwoXCLQodGC0YDQtdC70LrQvtCy0YvQuSDRgNC10LfQuNGB0YI6IFwiICsgY3VycmVudF9tb3ZlLnRvU3RyaW5nKCkpXHJcbnZhciBkb2RnZV9sdmwgPSAkKERPREdFX0xWTF9TRUxFQ1RPUik7XHJcbmRvZGdlX2x2bC5odG1sKFwi0KPQstC+0YDQvtGCOiBcIiArIGN1cnJlbnRfZG9kZ2UudG9TdHJpbmcoKSlcclxuXHJcbnZhciBLRF9wcmljZSA9ICQoS0RfUFJJQ0VfU0VMRUNUT1IpO1xyXG5LRF9wcmljZS5odG1sKFwi0KbQtdC90LAg0LDQv9Cz0YDQtdC50LTQsDogXCIgKyBjdXJyZW50X0tEX3ByaWNlLnRvU3RyaW5nKCkpXHJcbnZhciByZXNpc3RfcHJpY2UgPSAkKFJFU0lTVF9QUklDRV9TRUxFQ1RPUik7XHJcbnJlc2lzdF9wcmljZS5odG1sKFwi0KbQtdC90LAg0LDQv9Cz0YDQtdC50LTQsDogXCIgKyBjdXJyZW50X3Jlc2lzdF9wcmljZS50b1N0cmluZygpKVxyXG52YXIgbW92ZV9wcmljZSA9ICQoTU9WRV9QUklDRV9TRUxFQ1RPUik7XHJcbm1vdmVfcHJpY2UuaHRtbChcItCm0LXQvdCwINCw0L/Qs9GA0LXQudC00LA6IFwiICsgY3VycmVudF9tb3ZlX3ByaWNlLnRvU3RyaW5nKCkpXHJcbnZhciBkb2RnZV9wcmljZSA9ICQoRE9ER0VfUFJJQ0VfU0VMRUNUT1IpO1xyXG5kb2RnZV9wcmljZS5odG1sKFwi0KbQtdC90LAg0LDQv9Cz0YDQtdC50LTQsDogXCIgKyBjdXJyZW50X2RvZGdlX3ByaWNlLnRvU3RyaW5nKCkpXHJcblxyXG52YXIgdG90YWxfcHJpY2VfZW50cnkgPSAkKFRPVEFMX1BSSUNFX1NFTEVDVE9SKTtcclxudG90YWxfcHJpY2VfZW50cnkuaHRtbChcItCe0LHRidCw0Y8g0YHRgtC+0LjQvNC+0YHRgtGMOiBcIiArIHRvdGFsX2Nvc3QudG9TdHJpbmcoKSk7XHJcbiJdfQ==
