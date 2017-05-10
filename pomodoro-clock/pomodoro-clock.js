"use strict";

var currBreakLen = 5,
  currSessionLen = 25,
  currTime = (60*currSessionLen),
  currMode = "Session",
  currState = "pause",
  timerVar,
  changeTimer,

setLen = (currLen, dir) =>{
  if (dir === 1){
    if (currLen === 120){
      return 120;
    } else{
      return currLen++;
    } 
  } else if (dir === 0){
    if (currLen === 1){
      return 1;
    } else{
      return currLen--;
    }
  } else {
    return 0;
  }
  
},
  
formatTime = (time) =>{
  var min = Math.floor(time/60) + "",
      sec = (time%60) + "";
  while (sec.length < 2) {
        sec = "0" + sec;
    }
  return (min) + ":" + (sec);
},
  
tick = () =>{
  if (currTime > 0){
    currTime--;
    document.getElementById("timeTitle").innerHTML = formatTime(currTime);
  } else {
    switch(currMode){
    // if we are in session, flip to break
    case "Session":{
      currMode = "Break";
      currTime = (60*currBreakLen);
    }
    break;
    // if we are in break, flip to session
    case "Break":{
      currMode = "Session";
      currTime = (60*currSessionLen);
    }
    break;
  }
  clearInterval(timerVar);
  }
},
  
changeTimer = () =>{
  if (currState === "pause"){
    currState = "run";
    timerVar = setInterval(tick, currTime);
  } else if (currState === "run"){
    currState = "pause";
    clearInterval(timerVar);
  }
},

setVars = () =>{
  document.getElementById("breakAmt").innerHTML = currBreakLen;
  document.getElementById("sessionAmt").innerHTML = currSessionLen;
  document.getElementById("stateTitle").innerHTML = currMode;
  document.getElementById("timeTitle").innerHTML = formatTime(currTime);
};


$(document).ready(function() {
  setVars();
  $(" #timer ").on("click", changeTimer); 
});