var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');

var GM_PASSWORD = '123';

var handleError = function(err, res) {
  res.writeHead(404);
  res.end();
};

'use strict';

const express = require('express');
const {
  Server
} = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => {
    console.log('Responding to a request.');

    var filePath = extract(req.url);
    fs.readFile(filePath, function(err, data) {
      if (err) {
        handleError(err, res);
        return;
      } else {
        var type = mime.getType(filePath);
        console.log('Requested mime type: ' + type);
        res.setHeader('Content-Type', type);
        if (type === "application/json") {
          res.setHeader('Content-Disposition', 'attachment')
        }
        res.end(data);
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({
  server
});

wss.on('connection', (ws) => {
  console.log('client connection established');
  ws.on('message', function(data) {
    data = JSON.parse(data);
    console.log(data);

    if (data.command == 'add_character_permission') {
      var answer = {};
      answer.command = 'add_character_permission_server';
      answer.room_number = data.room_number;
      answer.to_name = data.from_name;
      if (data.password == GM_PASSWORD) {
        answer.isValid = 1;
      } else {
        answer.isValid = 0;
      }
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(answer));
      });

    } else if (data.command == 'player_info') {
      var answer = {};
      answer.room_number = data.room_number;
      answer.command = 'player_info_response';
      answer.to_name = data.from_name;
      answer.role = data.role;

      var character_list_unparsed = fs.readFileSync('./app/characters/character_list.json');
      var character_list = JSON.parse(character_list_unparsed);
      answer.character_list = character_list;

      var obstacle_list_unparsed = fs.readFileSync('./app/obstacles/obstacle_list.json');
      var obstacle_list = JSON.parse(obstacle_list_unparsed);
      answer.obstacle_list = obstacle_list;

      var weapon_list_unparsed = fs.readFileSync('./app/weapons/weapon_list.json');
      var weapon_list = JSON.parse(weapon_list_unparsed);
      answer.weapon_list = weapon_list;

      var skill_list_unparsed = fs.readFileSync('./app/skills/skill_list.json');
      var skill_list = JSON.parse(skill_list_unparsed);
      answer.skill_list = skill_list;

      var item_list_unparsed = fs.readFileSync('./app/items/item_list.json');
      var item_list = JSON.parse(item_list_unparsed);
      answer.item_list = item_list;

      var potion_list_unparsed = fs.readFileSync('./app/potions/potion_list.json');
      var potion_list = JSON.parse(potion_list_unparsed);
      answer.potion_list = potion_list;

      var saves_list_unparsed = fs.readFileSync('./app/saves/saves_list.json');
      var saves_list = JSON.parse(saves_list_unparsed);
      answer.saves_list = saves_list;

      var skill_detailed_info = [];

      for (skill_name of skill_list) {
        var filename = './app/skills/' + skill_name + '.json'
        if (fs.existsSync(filename)) {
          var current_skill = JSON.parse(fs.readFileSync(filename));
        } else {
          var current_skill = {}
        }
        skill_detailed_info.push(current_skill)
      }
      answer.skill_detailed_info = skill_detailed_info

      var item_detailed_info = [];

      for (item_name of item_list) {
        var filename = './app/items/' + item_name + '.json'
        if (fs.existsSync(filename)) {
          var current_item = JSON.parse(fs.readFileSync(filename));
        } else {
          var current_item = {}
        }
        item_detailed_info.push(current_item)
      }
      answer.item_detailed_info = item_detailed_info

      var potion_detailed_info = [];

      for (potion_name of potion_list) {
        var filename = './app/potions/' + potion_name + '.json'
        if (fs.existsSync(filename)) {
          var current_potion = JSON.parse(fs.readFileSync(filename));
        } else {
          var current_potion = {}
        }
        potion_detailed_info.push(current_potion)
      }
      answer.potion_detailed_info = potion_detailed_info

      var character_group_list = [];
      for (character_name of character_list) {
        current_character_unparsed = fs.readFileSync('./app/characters/' + character_name + '.json');
        var current_character = JSON.parse(current_character_unparsed);
        if (current_character.hasOwnProperty("group")) {
          var character_group = current_character.group
        } else {
          var character_group = "other"
        }
        character_group_list.push(character_group)
      }
      answer.character_group_list = character_group_list

      weapon_detailed_info = []
      for (weapon_name of weapon_list) {
        current_weapon_unparsed = fs.readFileSync('./app/weapons/' + weapon_name + '.json');
        var current_weapon = JSON.parse(current_weapon_unparsed);
        weapon_detailed_info.push(current_weapon)
      }
      answer.weapon_detailed_info = weapon_detailed_info

      answer.isValid = 1;
      if (data.role == 'gm') {
        if (data.password != GM_PASSWORD) {
          answer.isValid = 0;
        }
      }
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(answer));
      });
    } else if (data.command == 'new_character_profile') {
      console.log(data);
      var character = data.character;
      fs.writeFile('./app/characters/' + character.name + '.json', JSON.stringify(character), function(err) {
        if (err) {
          console.log('There has been an error saving current character');
          console.log(err.message);
          return;
        }
        console.log('Current character saved succesfully.')
      });

      var character_list_unparsed = fs.readFileSync('./app/characters/character_list.json');
      var character_list = JSON.parse(character_list_unparsed);
      character_list.push(character.name);
      fs.writeFile('./app/characters/character_list.json', JSON.stringify(character_list), function(err) {
        if (err) {
          console.log('There has been an error saving character list.');
          console.log(err.message);
          return;
        }
        console.log('Character list saved succesfully.')
      });

    } else if (data.command == 'construct_board') {
        data.command = 'construct_board_response';
        data.to_name = 'all';
        wss.clients.forEach(function(clientSocket) {
          clientSocket.send(JSON.stringify(data));
        });
    } else if (data.command == 'add_character') {
        var response = {};
        response.room_number = data.room_number;
        response.command = 'add_character_response';
        response.cell_id = data.cell_id;
        response.to_name = 'all';
        response.character_number = data.character_number;

        var character_unparsed = fs.readFileSync('./app/characters/' + data.character_name + '.json');
        var character = JSON.parse(character_unparsed);
        response.character_info = character;
        wss.clients.forEach(function(clientSocket) {
          clientSocket.send(JSON.stringify(response));
        });
    } else if (data.command == 'add_obstacle') {
        var response = {};
        response.room_number = data.room_number;
        response.command = 'add_obstacle_response';
        response.cell_id = data.cell_id;
        response.to_name = 'all';
        response.obstacle_number = data.obstacle_number;

        var obstacle_unparsed = fs.readFileSync('./app/obstacles/' + data.obstacle_name + '.json');
        var obstacle = JSON.parse(obstacle_unparsed);
        response.obstacle_info = obstacle;
        wss.clients.forEach(function(clientSocket) {
          clientSocket.send(JSON.stringify(response));
        });
    } else if (data.command == 'move_character') {
        data.command = 'move_character_response';
        data.to_name = 'all';
        wss.clients.forEach(function(clientSocket) {
          clientSocket.send(JSON.stringify(data));
        });
    } else if (data.command == 'delete_object') {
      data.command = 'delete_object_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'roll_initiative') {
      data.command = 'roll_initiative_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'deal_damage') {
      data.command = 'deal_damage_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'save_game') {
      var response = {};
      response.room_number = data.room_number;
      response.command = 'save_game_response';
      response.save_name = data.save_name;
      response.to_name = data.from_name;
      if (fs.existsSync('./app/saves/' + data.save_name + '.json')) {
        response.success = 0;
      } else {
        var saves_list_unparsed = fs.readFileSync('./app/saves/saves_list.json');
        var saves_list = JSON.parse(saves_list_unparsed);
        saves_list.push(data.save_name);
        fs.writeFile('./app/saves/saves_list.json', JSON.stringify(saves_list), function(err) {
          if (err) {
            console.log('There has been an error adding new save to a list.');
            console.log(err.message);
            return;
          }
          console.log('Save list saved succesfully.')
        });

        fs.writeFile('./app/saves/' + data.save_name + '.json', JSON.stringify(data.full_game_state), function(err) {
          if (err) {
            console.log('There has been an error saving game state.');
            console.log(err.message);
            return;
          }
          console.log('Game state saved succesfully.')
        });
        response.success = 1;
      }
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(response));
      });
    } else if (data.command == 'add_item_to_container') {
      data.command = 'add_item_to_container_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'load_game') {
      var response = {};
      response.room_number = data.room_number;
      response.command = 'load_game_response';
      response.save_name = data.save_name;
      if (fs.existsSync('./app/saves/' + data.save_name + '.json')) {
        response.success = 1;
        response.to_name = 'all';
        var game_state_unparsed = fs.readFileSync('./app/saves/' + data.save_name + '.json');
        var game_state = JSON.parse(game_state_unparsed);
        response.full_game_state = game_state;
      } else {
        response.success = 0;
        response.to_name = data.from_name;
      }
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(response));
      });
    } else if (data.command == 'sync_board') {
      data.command = 'sync_board_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });

    } else if (data.command == 'update_fog') {
      data.command = 'update_fog_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'assign_zone') {
      data.command = 'assign_zone_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'search_action') {
      data.command = 'search_action_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'resolve_attack') {
      data.command = 'resolve_attack_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'attack_obstacle') {
      data.command = 'attack_obstacle_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'new_round') {
      data.command = 'new_round_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'battle_mod') {
      data.command = 'battle_mod_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'skill') {
      data.command = 'skill_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'simple_roll') {
      data.command = 'simple_roll_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'change_character_visibility') {
      data.command = 'change_character_visibility_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'guild_sim_new_char') {
      var character = data.character;
      fs.writeFile('./app/guild_sim_fighters/' + character.name + '.json', JSON.stringify(character), function(err) {
        if (err) {
          console.log('There has been an error saving current character');
          console.log(err.message);
          return;
        }
        console.log('Current character saved succesfully.')
      });

      var character_list_unparsed = fs.readFileSync('./app/guild_sim_fighters/character_list.json');
      var character_list = JSON.parse(character_list_unparsed);
      character_list.push(character.name);
      fs.writeFile('./app/guild_sim_fighters/character_list.json', JSON.stringify(character_list), function(err) {
        if (err) {
          console.log('There has been an error saving character list.');
          console.log(err.message);
          return;
        }
        console.log('Character list saved succesfully.')
      });
    } else if (data.command == 'ignore_me') {
      // ignoring
    } else if (data.command == 'apply_effect') {
      data.command = 'apply_effect_response';
      data.to_name = 'all';
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    } else if (data.command == 'guild_sim_init') {
      var character_list_unparsed = fs.readFileSync('./app/guild_sim_fighters/character_list.json');
      var character_list = JSON.parse(character_list_unparsed);
      var response = {}
      response.command = 'guild_sim_init_response'
      response.character_list = character_list

      var character_detailed_info = []
      for (character_name of character_list) {
        var filename = './app/guild_sim_fighters/' + character_name + '.json'
        if (fs.existsSync(filename)) {
          var current_character = JSON.parse(fs.readFileSync(filename));
        } else {
          var current_character = {}
        }
        character_detailed_info.push(current_character)
      }
      response.character_detailed_info = character_detailed_info
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(response));
      });

    }
    else {
      console.log('fucking pog ' + data['command']);
      wss.clients.forEach(function(clientSocket) {
        clientSocket.send(JSON.stringify(data));
      });
    }
  });
});
