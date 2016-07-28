$(document).ready(function(){
  var lastPressed = "0",
      currLine = lastPressed,
      types = ["num", "op", "err"],
      lastType = types[0],
      calcDone = true;
      
  function updateDisplay(){
    $("#screen-top").html(lastPressed);
    $("#screen-bot").html(currLine);
  }
  function checkLimit(){
    if (lastPressed.toString().length > 8){
      lastPressed = "0";
      currLine = "Digit Limit Met";
      calcDone = true;
      lastType = types[2];
      updateDisplay();
      return false;
    }
    return true;
  }
  function performCalc(){
    let evalStr = currLine;
    lastPressed = eval(evalStr);
    if (!Number.isInteger(lastPressed)){
      lastPressed = lastPressed.toFixed(2);
    }
    currLine = evalStr + "=" + lastPressed;
    return checkLimit();
  }
  function addInput(){
    var str = this.textContent,
        thisType = types[1];
    switch (str){
      case "AC":
        currLine = 0;
        lastPressed = 0;
        calcDone = true;
        break;
      case "CE":
        lastPressed = 0;
        calcDone = false;
        // Need to strip out last operation or number
        break;
      case "=":
        if (!calcDone){
          performCalc();
          calcDone = true;
        }
        break;  
      case "0":
        if (calcDone){
          break;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        thisType = types[0];
      default:
        if (calcDone){
          // If the last thing we did ended an expression:
          // If user inputs a number, set that as the currLine and the lastPressed
          if (thisType === types[0]){
            currLine = str;
            lastPressed = str;
            calcDone = false;
          } else {
            currLine = 0;
            lastPressed = 0;
            calcDone = true;
          }
        } else {
          // The last thing we did was not expression-ending: continue the current expression
          if ((lastPressed === '0') && (str === '0')){
            // don't change anything about the current state, just break
            break;
          }
          // The last thing we did was not expression-ending and the user did not just enter '0':
          if ((thisType === lastType) && (thisType === types[0])){
            // This type is a num and so was last type
            lastPressed += str;
            currLine += str;
            calcDone = false;
            break;
          } else if ((thisType === lastType) && (thisType === types[1])){
            // This type is an op and so was last type
            // Need to replace the exact last character with the current op
            lastPressed = str;
            currLine = currLine.substring(0, (currLine.length - 1)) + str;
            calcDone = false;
            break;
          } else {
            // this type is not the same as last type, so append the character to the currLine and set it as lastPressed
            currLine += str;
            lastPressed = str;
            calcDone = false;
            break;
          }
        }
    }
    if (checkLimit()){
      lastType = thisType;
      updateDisplay();
    }
  }

  $("#btn-0").bind("click", addInput);
  $("#btn-1").bind("click", addInput);
  $("#btn-2").bind("click", addInput);
  $("#btn-3").bind("click", addInput);
  $("#btn-4").bind("click", addInput);
  $("#btn-5").bind("click", addInput);
  $("#btn-6").bind("click", addInput);
  $("#btn-7").bind("click", addInput);
  $("#btn-8").bind("click", addInput);
  $("#btn-9").bind("click", addInput);

  $("#btn-AC").bind("click", addInput);
  $("#btn-CE").bind("click", addInput);
  $("#btn-DIVIDE").bind("click", addInput);
  $("#btn-TIMES").bind("click", addInput);
  $("#btn-MINUS").bind("click", addInput);
  $("#btn-PLUS").bind("click", addInput);
  $("#btn-PERIOD").bind("click", addInput);
  $("#btn-EQUALS").bind("click", addInput);

  updateDisplay();
});