function convertToRoman(num) {
  "use strict";
  // alert("Before: " + num);
  var returnArr = [],
    currNum = num,
    place = 1;

  function pushArray(currDigit, currPlace) {
    let valToPush = [];
    /*
      First, determine what the current digit is and return the required pattern.
      This will be in the form:
        # is current digit character
        ^ is next-digit character
        * is the following digit
        (so if digit is ones, # will translate to I, ^ will translate to V and * will translate to X)
     */
    switch (currDigit) {
      case 1:
      case 2:
      case 3:
        for (let i = 0; i < currDigit; i++) {
          valToPush.push('#');
        }
        break;
      case 4:
        valToPush.push('#');
        valToPush.push('^');
        break;
      case 5:
        valToPush.push('^');
        break;
      case 6:
      case 7:
      case 8:
        valToPush.push('^');
        for (let i = 0; i < (currDigit - 5); i++) {
          valToPush.push('#');
        }
        break;
      case 9:
        valToPush.push('#');
        valToPush.push('*');
        break;
    }
    /*
      Now, replace pattern with correct digits
      # - I or X or C or M
      ^ - V or L or D
      * - X or C or M
    */
    function replacePattern(toFind, toReplace) {
      let toFindLoc = valToPush.indexOf(toFind);
      while (toFindLoc != -1) {
        valToPush.splice(toFindLoc, 1, toReplace);
        toFindLoc = valToPush.indexOf(toFind);
      }
    }
    switch (currPlace) {
      case 1:
        // In place 1 (ones), I, V, X
        replacePattern('#', 'I');
        replacePattern('^', 'V');
        replacePattern('*', 'X');
        break;
      case 2:
        // In place 2 (tens), X, L, C
        replacePattern('#', 'X');
        replacePattern('^', 'L');
        replacePattern('*', 'C');
        break;
      case 3:
        // In place 3 (hundreds), C, D, M
        replacePattern('#', 'C');
        replacePattern('^', 'D');
        replacePattern('*', 'M');
        break;
      case 4:
        /*
          In place 4 (thousands), just M
          That is,  numbers above 3999 will break (checked in parent func)
          '\u0305' combining overline used for numerals up to 1000000
        */
        replacePattern('#', 'M');
        replacePattern('^', 'V\u0305');
        replacePattern('*', 'X\u0305');
        break;
      case 5:
        replacePattern('#', 'X\u0305');
        replacePattern('^', 'L\u0305');
        replacePattern('*', 'C\u0305');
        break;
      case 6:
        replacePattern('#', 'C\u0305');
        replacePattern('^', 'D\u0305');
        replacePattern('*', 'M\u0305');
        break;
      case 7:
        replacePattern('#', 'M\u0305');
        break;
    }
    returnArr.unshift(valToPush.join(""));
  }

  function getDigit(thisNum) {
    let placeVal = thisNum % 10;
    // alert ("Place Val: " + placeVal);
    currNum = (thisNum - placeVal) / 10;
    return placeVal;
  }

  // pop off a digit, record its place
  while (currNum > 0) {
    // Push values onto the array based on current place:
    pushArray(getDigit(currNum), place);
    place++;
  }
  return returnArr.join("");
}

function inputSanitize(input) {
  "use strict";
  try {
    if (isNaN(input)) {
      throw new TypeError('Parameter is not a number');
    } else if ( input < 0 ) {
      throw new RangeError('Parameter must be non-negative');
    } else if ( input > 3999999 ){
      throw new RangeError('Parameter must be less than 4 million (no known roman value for 5 million)');
    } else {
      return convertToRoman(input);
    }
  }
  catch(err){
    alert(err);
    return false;
  }
}

$(document).ready(function() {
  "use strict";
  $("form").submit(function(event) {
    let result = inputSanitize($("input:first").val());
    if ( result ){
      $("#answer").html('<h3 class="col-md-12 text-center">Answer: ' + result + '</h3>');
    }
    event.preventDefault();
  });
});