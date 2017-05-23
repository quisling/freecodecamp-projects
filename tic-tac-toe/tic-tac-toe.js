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
      return true;
   } else if (checkWin(0)){
      winner = true;
      alert("AI Wins!");
      return true;
   } else{
      winner = false;
      return false;
   }
},

setSquare = (yComp, xComp, toSet) =>{
   playArea[yComp][xComp] = toSet;
   drawBoard();
   checkEnd();
},

aiTurn = () =>{
   setNextSquareRandom();
   setSquare(nextSquare[0], nextSquare[1], aiChar);
},

isFull = (yVal, xVal) =>{
   let testVal = playArea[yVal][xVal];
   if ((testVal != 'O') && (testVal != 'X')) {
      return false;
   }

   return true;
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
      full = isFull(nextSquare[0], nextSquare[1]);
   };
},

drawBoard = () =>{
   for (let i=0; i<3; i++){
      for (let j=0; j<3; j++){
         document.getElementById("space" + i.toString() + j.toString()).innerHTML = playArea[i][j];
      }
   }
},

getInput = (item) =>{
   // Do input
   let getPos = item.currentTarget.id.substring(5),
       getY = getPos.substring(0,1),
       getX = getPos.substring(1);
   if (isFull(getY, getX)){
      alert("This square is already full!");
      return false;
   }
   // Otherwise, mark that square as filled by playerchar, check end, run ai turn
   setSquare(getY, getX, playerChar);
   if (!winner){
      aiTurn();
   };
};

$(document).ready(function() {
   $(" div[id^=space] ").on("click", this.id ,getInput);
	drawBoard();
   initAI();
});