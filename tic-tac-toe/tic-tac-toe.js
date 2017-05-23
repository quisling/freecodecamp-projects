"use strict";

var isPlayerO = Math.floor(Math.random()*2),
    aiChar,
    playerChar,
    playerGoesFirst = 0, //Math.floor(Math.random()*2),
    playArea = [['&nbsp;','&nbsp;','&nbsp;'],['&nbsp;','&nbsp;','&nbsp;'],['&nbsp;','&nbsp;','&nbsp;']],
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

  if (!playerGoesFirst){
      aiTurn();
   };
},

checkWin = (player) =>{
   let checkVal;
   if (player){
      checkVal = playerChar;
   } else {
      checkVal = aiChar;
   }

   if (playArea[0][0] === checkVal){
      if (playArea[0][1] === checkVal){
         if (playArea[0][2] === checkVal){
            // Top Row
            return true;
         }
      }
      if (playArea[1][0] === checkVal){
         if (playArea[2][0] === checkVal){
            // Left Col
            return true;
         }
      }
      if (playArea[1][1] === checkVal){
         if (playArea[2][2] === checkVal){
            //Top L to Bot R Diag
            return true;
         }
      }
   }
   if (playArea[0][1] === checkVal){
      if (playArea[1][1] === checkVal){
         if (playArea[2][1] === checkVal){
            // Mid Col
            return true;
         }
      }
   }
   if (playArea[0][2] === checkVal){
      if (playArea[1][2] === checkVal){
         if (playArea[2][2] === checkVal){
            // Right Col
            return true;
         }
      }
      if (playArea[1][1] === checkVal){
         if (playArea[2][0] === checkVal){
            // Top R to Bot L Diag
            return true;
         }
      }
   }
   if (playArea[1][0] === checkVal){
      if (playArea[1][1] === checkVal){
         if (playArea[1][2] === checkVal){
             // Mid Row
             return true;
         }
      }
   }
   if (playArea[2][0] === checkVal){
      if (playArea[2][1] === checkVal){
         if(playArea[2][2] === checkVal){
            // Bot Row
            return true;
         }
      }
   }
   return false;
},
    
checkEnd = () =>{
   if (checkWin(1)){
      winner = true;
      alert("Player Wins!");
   } else if (checkWin(0)){
      winner = true;
      alert("AI Wins!");
   } else{
      winner = false;
   }
},

setSquare = (xComp, yComp, toSet) =>{
   playArea[xComp][yComp] = toSet;
   drawBoard();
   checkEnd();
},

aiTurn = () =>{
   setNextSquareRandom();
   setSquare(nextSquare[0], nextSquare[1], aiChar);
},

playTurn = (event) =>{
   alert(event);
},

setNextSquareRandom = () =>{
   let full = true,
       getRand = () =>{
         return Math.floor(Math.random()*3);
   };
   
   while (full){
      for (let i=0; i<2; i++){
         nextSquare[i] = getRand();
      };
      let testVal = playArea[nextSquare[0]][nextSquare[1]];
      if ((testVal != 'O') && (testVal != 'X')) {
          full = false;
      };
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
   //$(" div[id^=space] ").on("click", playTurn());
	drawBoard();
   initAI();
   //while (!winner){
      getInput();
   //};
});