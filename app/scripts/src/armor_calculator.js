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
  KD_price.html("Цена апгрейда: " + current_KD_price.toString())
  resist_price.html("Цена апгрейда: " + current_resist_price.toString())
  move_price.html("Цена апгрейда: " + current_move_price.toString())
  dodge_price.html("Цена апгрейда: " + current_dodge_price.toString())
}

function apply_module_scale() {
  current_KD_price = parseInt(current_KD_price*module_scale);
  current_resist_price = parseInt(current_resist_price*module_scale);
  current_move_price = parseInt(current_move_price*module_scale);
  current_dodge_price = parseInt(current_dodge_price*module_scale);
}

function increase_KD() {
  current_KD = current_KD + step_KD;
  KD_lvl.html("КД: " + current_KD.toString())

  update_total_cost(current_KD_price)

  current_KD_price = current_KD_price*specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_resist() {
  current_resist = current_resist + step_resist;
  resist_lvl.html("Милли резист: " + current_resist.toString() + "%")

  update_total_cost(current_resist_price)

  current_resist_price = current_resist_price*specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_move() {
  current_move = current_move + step_move;
  move_lvl.html("Стрелковый резист: " + current_move.toString())

  update_total_cost(current_move_price)

  current_move_price = current_move_price*specialization_scale;
  apply_module_scale();

  update_price_display();
}

function increase_dodge() {
  current_dodge = current_dodge + step_dodge;
  dodge_lvl.html("Уворот: " + current_dodge.toString())

  update_total_cost(current_dodge_price)

  current_dodge_price = current_dodge_price*specialization_scale;
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
KD_lvl.html("КД: " + current_KD.toString())
var resist_lvl = $(RESIST_LVL_SELECTOR);
resist_lvl.html("Милли резист: " + current_resist.toString() + "%")
var move_lvl = $(MOVE_LVL_SELECTOR);
move_lvl.html("Стрелковый резист: " + current_move.toString())
var dodge_lvl = $(DODGE_LVL_SELECTOR);
dodge_lvl.html("Уворот: " + current_dodge.toString())

var KD_price = $(KD_PRICE_SELECTOR);
KD_price.html("Цена апгрейда: " + current_KD_price.toString())
var resist_price = $(RESIST_PRICE_SELECTOR);
resist_price.html("Цена апгрейда: " + current_resist_price.toString())
var move_price = $(MOVE_PRICE_SELECTOR);
move_price.html("Цена апгрейда: " + current_move_price.toString())
var dodge_price = $(DODGE_PRICE_SELECTOR);
dodge_price.html("Цена апгрейда: " + current_dodge_price.toString())

var total_price_entry = $(TOTAL_PRICE_SELECTOR);
total_price_entry.html("Общая стоимость: " + total_cost.toString());
