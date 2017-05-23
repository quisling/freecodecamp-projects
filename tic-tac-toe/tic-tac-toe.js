"use strict";

var isO = 0,
    goesFirst = math.round(math.random()),
    playArea = [['','',''],['','',''],['','','']],

getRandomSquare = () =>{
	alert(goesFirst);
},
drawBoard = () =>{
   for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
         document.getElementById("space"+i+j).innerHTML = playArea[i,j];
      }
   }
};

$(document).ready(function() {
	drawBoard();
   getRandomSquare();
	//document.getElementById("play-area").innerHTML = goesFirst;
});