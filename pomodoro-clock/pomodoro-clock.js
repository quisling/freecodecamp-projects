"use strict";

var breakLength = 5,
  sessionLength = 25,
  running = 0;

function refresh(){
  document.getElementById("breakAmt").innerHTML= breakLength;
  document.getElementById("sessionAmt").innerHTML = sessionLength;
};

$(document).ready(function() {
  refresh();
});