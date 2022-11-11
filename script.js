


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
  if (buttonInfo.type === 'number') processNumberButton(buttonInfo.value);
  if (buttonInfo.type === 'sign') processSignButton();
  if (buttonInfo.type === 'decimal') processDecimalButton();
  if (buttonInfo.type === 'percentage') processPercentageButton();
  if (buttonInfo.type === 'one-over') processOneOverButton();
  if (buttonInfo.type === 'radical') processSquareRootButton();
  if (buttonInfo.type === 'addition' || buttonInfo.type === 'subtraction' ||
      buttonInfo.type === 'multiplication' || buttonInfo.type === 'division') {
    processOperatorButton(buttonInfo.type);
  }
  if (buttonInfo.type === 'delete') processDeleteButton();
  if (buttonInfo.type === 'clear') processClearButton();
  if (buttonInfo.type === 'equal') processEqualButton(buttonInfo.type);

  updateCurrentOperatingScreenUI();

  console.log(calculator)
}


function updateCurrentOperatingScreenUI() {
  const currentOperatingScreen = document.querySelector('.current-operating-screen');

  if (calculator.secondOperand) {
    const operatorSymbol = getOperatorSymbol(calculator.currentOperator);
    currentOperatingScreen.textContent = `${calculator.firstOperand} ${operatorSymbol} ${calculator.secondOperand}`;
  } else if (calculator.currentOperator) {
    const operatorSymbol = getOperatorSymbol(calculator.currentOperator);
    currentOperatingScreen.textContent = `${calculator.firstOperand} ${operatorSymbol}`;
  } else if (calculator.firstOperand) {
    currentOperatingScreen.textContent = `${calculator.firstOperand}`;
  }

}





function getOperatorSymbol(operator) {
  if (operator === 'addition') return '+';
  if (operator === 'subtraction') return '-';
  if (operator === 'multiplication') return 'x';
  if (operator === 'division') return '÷';
}


function processEqualButton() {
  //if both operands are not defined return
  if (!calculator.firstOperand || !calculator.secondOperand) return;
  calculator.firstOperand = String(evaluate(calculator.currentOperator));
  calculator.secondOperand = '';
  calculator.currentOperand = 'second';
  calculator.currentOperator = null;
}


function processDeleteButton() {
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand = calculator.firstOperand.slice(0, calculator.firstOperand.length-1);
  } else {
    calculator.secondOperand = calculator.secondOperand.slice(0, calculator.secondOperand.length-1);
  }
}

function processClearButton() {
  resetCalculatorState();
}

function resetCalculatorState() {
  calculator.firstOperand = '';
  calculator.secondOperand = '';
  calculator.currentOperand = 'first';
  calculator.currentScreen = '';
  calculator.currentOperatingScreen = '';
  calculator.currentOperator = null;
}

function processNumberButton(value) {
  if (calculator.currentOperand === 'first') calculator.firstOperand += value;
  else calculator.secondOperand += value;
}

function processSignButton() {
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand.includes('-')) {
      calculator.firstOperand = calculator.firstOperand.slice(2, calculator.firstOperand.length-1);
    } else {
      calculator.firstOperand = `(-${calculator.firstOperand})`;
    }
  } else {
    if (calculator.secondOperand.includes('-')) {
      calculator.secondOperand = calculator.secondOperand.slice(2, calculator.secondOperand.length-1);
    } else {
      calculator.secondOperand = `(-${calculator.secondOperand})`;
    }
  }
}

function processOperatorButton(operator) {

  if (calculator.currentOperand === 'second') {
    calculator.firstOperand = String(evaluate(calculator.currentOperator));
    calculator.secondOperand = '';
  } else {
    calculator.currentOperand = 'second';
  }
  calculator.currentOperator = operator;

}

function evaluate(operator) {
  if (operator === 'addition') {
    return Number(calculator.firstOperand) + Number(calculator.secondOperand);
  }
  if (operator === 'subtraction') {
    return Number(calculator.firstOperand) - Number(calculator.secondOperand);
  }
  if (operator === 'division') {
    return Number(calculator.firstOperand) / Number(calculator.secondOperand);
  }
  if (operator === 'multiplication') {
    return Number(calculator.firstOperand) * Number(calculator.secondOperand);
  }
}


function processDecimalButton() {
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand.includes('.')) return;
    calculator.firstOperand += '.';
  } else {
    if (calculator.secondOperand.includes('.')) return;
    calculator.secondOperand += '.';
  }
}

function processPercentageButton() {
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand = Number(calculator.firstOperand)/100;
  } else {
    calculator.secondOperand = Number(calculator.secondOperand)/100;
  }
}

function processOneOverButton() {
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand = 1/Number(calculator.firstOperand);
  } else {
    calculator.secondOperand = 1/Number(calculator.secondOperand);
  }
}

function processSquareRootButton() {
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand = Math.sqrt(calculator.firstOperand);
  } else {
    calculator.secondOperand = Math.sqrt(calculator.secondOperand);
  }
}



(function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => button.addEventListener('click', processButton));
})();