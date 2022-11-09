


const calculator = {
  currentScreen: '',
  currentOperatingScreen: '',
  firstOperand: '',
  secondOperand: '',
  currentOperand: 'first',
  currentOperator: null,
}




//add A event listener to each button
function processButton(e) {
  const clickedButton = e.target;
  const buttonInfo = getButtonIdentity(clickedButton);
  //update calculator state
  updateCalculatorState(buttonInfo)
  //update COS
  //update CS
}


function getButtonIdentity(clickedButton) {
  const buttonClassList = clickedButton.classList;
  const type = buttonClassList[1];
  if (type === 'number') {
    let value;
    value = clickedButton.textContent;
    return {type, value};
  }
  return {type}

}


function updateCalculatorState(buttonInfo) {
  //NUMBER
  if (buttonInfo.type === 'number') processNumberButton(buttonInfo.value);
  //NUMBER SIGN
  //DECIMAL
  //PERCENTAGE
  //1/X
  //SQUARE ROOT
  //ADDITION
  //SUBTRACTION
  //DIVISION
  //MULTIPLICATION
  //EVALUATOR
}



function processNumberButton(value) {
  if (calculator.currentOperand === 'first') calculator.firstOperand += value;
  else calculator.secondOperand += value;
  console.log(calculator)
}





(function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => button.addEventListener('click', processButton));
})();