/*
  1. I can add, subtract, divide, and multiply two numbers
  2. I can clear the input field with a clear button
  3. I can chain mathematical expressions together untill I hit the equal and get the
     right result
  4. Note: limit input size so we don't get display overflows

  I need to:
  1. get correct number or operator from each button press
  2. output each key press to the display and clear it when either ac or ce button is pressed
  3. create data structure to hold input, parse it to perfrom calc, and then output it to display on equal
*/
//create an object to perform calculator functions
var calculator = (function(){
  var MAX = 10;
  var inputBuffer = "";
  var myCalc = {};

  function addToBuffer(value){
    if(inputBuffer.length < MAX){
     return inputBuffer += value;
    }
  };
  function clearBuffer(){
    inputBuffer = "";
  };
  function updateDisplay(){

    if(arguments.length > 0){
      //console.log("my arguments are: " + arguments[0]);
      $("#display p").text(arguments[0]);
    }
    else if(inputBuffer.length === 0){
      $("#display p").text("0");
    }
    else{
      $("#display p").text(inputBuffer);
    }
  };

  myCalc.input = function(value){
    addToBuffer(value);
    updateDisplay();
  };

  myCalc.clear = function(){
    clearBuffer();
    updateDisplay();
  };

  myCalc.calculate = function(){
    /*number.toExponential  on any answer greater than MAX*/

    try{
      var calc = new Function('return ' + inputBuffer + ';');
      var answer = calc(); //no longer use eval(inputBuffer) because new Function offers better performance
      //console.log(answer);
      if(answer == 777){
        updateDisplay("Carl Hain");
        return 0;
      }

      answer = answer.toString();
      var len = answer.length;
      if(len > MAX){
        answer = answer.slice(0, len + 2 - MAX);
      }
      this.clear();
      this.input(answer);
    }
    catch(e){
      clearBuffer();
      updateDisplay("ERROR");
    }
  };
  return myCalc;
})();
/*
  Main function to run on document ready
*/
$("document").ready(function(){
  $("#display p").text("0");
  //set up event handler for button clicks
  $(".calc-btn").on("click", function(event){
    var value = event.target.value;
    if(value === 'ce' || value === 'ac'){ calculator.clear(); }
    else if(value === '='){ calculator.calculate(); }
    else{ calculator.input(value); }
  });
});