"use strict";

//////////////////////////////////////////
// VARS
//////////////////////////////////////////

const MAP_SIZE_X = 80;
const MAP_SIZE_Y = 80;
let map = [];
let map_id = 0;

///////////////////////////////////////////
// MAP LOAD
///////////////////////////////////////////

function map_load(){

	// class constructor
	class map_gen {
  		constructor(type, y, x, id){
    	this.type = type; // a, b, c, d, e, current, end, start
    	this.y = y;
    	this.x = x;
    	this.id = id;
  		}
	}

	// map object array creation
	for(var i = 0; i < MAP_SIZE_Y; i++){
			map[i] = [];
		for(var j = 0; j < MAP_SIZE_X; j++){

			map[i][j] = new map_gen("none", i, j, map_id);

			// random choose of block type
			let rand = Math.floor(Math.random() * 10);

			if (rand <= 4){
				map[i][j].type = "a";
			} else if(rand > 4) {
				map[i][j].type = "b";
			}

			/*
			switch(rand){
				case 0:
				case 1:
				case 2:
					map[i][j].type = "a";
				break;
				case 3:
				case 4:
					map[i][j].type = "b";
				break;
				case 5:
				case 6:
					map[i][j].type = "c";
				break;
				case 7:
				case 8:
					map[i][j].type = "d";
				break;
				case 9:
					map[i][j].type = "e";
				break;
			}*/

			map_id = map_id + 1;

		}
	}

}

//////////////////////////////////////////////////////////////
// CELULAR AUTOMATA
//////////////////////////////////////////////////////////////

function check_block_count(row, col){

	let count = 0;

	// check 8 positions around the block
 	for(var y = row-1; y <= row+1; y++){
		for(var x = col-1; x <= col+1; x++){
			if(y < MAP_SIZE_Y && y >= 0 && x < MAP_SIZE_X && x >= 0){
				if(y != row || x != col){
					if(map[y][x].type == "b"){
						count++;
					}
				}
			} else { // create incentive for walls in the edges of the map
				count++;
			}
		}
	}

	return count;

}

 function celular_automata(){

 	for(var i = 0; i < MAP_SIZE_Y; i++){
		for(var j = 0; j < MAP_SIZE_X; j++){
			let total = check_block_count(i, j);
			if(total > 4){
				map[i][j].type = "b";
			} else if(total < 4){
				map[i][j].type = "a";
			}
		}
	}

 }

//////////////////////////////////////////////////////////////
// BLOCKS DRAW
/////////////////////////////////////////////////////////////

function draw_block(){

	// creting caves from current map array
	celular_automata();

	let main = document.querySelector('.map');

	for(var i = 0; i < MAP_SIZE_Y; i++){
		for(var j = 0; j < MAP_SIZE_X; j++){

			function id_name(ttype){return 'map_grid '+ttype}

			let div = document.createElement('div');
			div.setAttribute('data-id', map[i][j].id);
			div.setAttribute('data-y', map[i][j].y);
			div.setAttribute('data-x', map[i][j].x);
			div.setAttribute('data-type', map[i][j].type);

			if (map[i][j].type == "a") {
				div.className = id_name("mg_a");
				main.appendChild(div);
			}

			if (map[i][j].type == "b") {
				div.className = id_name("mg_b");
				main.appendChild(div);
			}

			if (map[i][j].type == "c") {
				div.className = id_name("mg_c");
				main.appendChild(div);
			}

			if (map[i][j].type == "d") {
				div.className = id_name("mg_d");
				main.appendChild(div);
			}

			if (map[i][j].type == "e") {
				div.className = id_name("mg_e");
				main.appendChild(div);
			}

		}
	}// END

} 

