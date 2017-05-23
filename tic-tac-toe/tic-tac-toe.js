"use strict";

var isPlayerO = Math.floor(Math.random()*2),
    aiChar,
    playerChar,
    playerGoesFirst = 0, //Math.round(Math.random()),
    playArea = [['','',''],['','',''],['','','']],
    nextSquare = [0,0],
    winner = false,

initAI = () =>{
   if (isPlayerO){
     aiChar = 'X';
     playerChar = 'O';
  } else {
     aiChar = 'O';
     playerChar = 'X';
  };

  // Temp Board Setup
  for (let i=0; i<3; i++){
    for (let j=0; j<3; j++){
       playArea[i][j] = playerChar;
    }
  } 

  if (!playerGoesFirst){
      aiTurn();
   };
},

checkWin = () =>{
   winner = true;
},

setSquare = (xComp, yComp, toSet) =>{
   playArea[xComp][yComp] = toSet;
   drawBoard();
   checkWin();
},

aiTurn = () =>{
   setNextSquareRandom();
   setSquare(nextSquare[0], nextSquare[1], aiChar);
},

playTurn = (event) =>{
   
},

setNextSquareRandom = () =>{
	let getRand = () =>{
      return Math.floor(Math.random()*3);
   };

   for (let i=0; i<2; i++){
      nextSquare[i] = getRand();
   };
},

drawBoard = () =>{
   for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
         document.getElementById("space" + i.toString() + j.toString()).innerHTML = playArea[i][j];
      }
   }
},

getInput = () =>{
   // Do input
   aiTurn();
};

$(document).ready(function() {
	drawBoard();
   initAI();
   while (!winner){
      getInput();
   };
});