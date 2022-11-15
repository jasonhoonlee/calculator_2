


const calculator = {
  currentScreen: '',
  currentOperatingScreen: '',
  firstOperand: '',
  secondOperand: '',
  currentOperand: 'first',
  currentOperator: null,
  lastButton: null,
}




//add A event listener to each button
function processButton(e) {
  const clickedButton = e.target;
  const buttonInfo = getButtonIdentity(clickedButton);
  if (!calculator.firstOperand) {
    if (buttonInfo.type !== 'number') return;
  }

  updateCalculatorState(buttonInfo);
  updateCurrentOperatingScreenUI(buttonInfo.type);
  updateCurrentScreenUI();

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
  if (buttonInfo.type === 'equal') processEqualButton();

}


function resetCalculatorState() {
  calculator.firstOperand = '';
  calculator.secondOperand = '';
  calculator.currentOperand = 'first';
  calculator.currentScreen = '';
  calculator.currentOperatingScreen = '';
  calculator.currentOperator = null;
  calculator.lastButton = null;
}


function updateCurrentOperatingScreenUI(buttonType) {

  const currentOperatingScreen = document.querySelector('.current-operating-screen');

  if (buttonType === 'equal') {
    currentOperatingScreen.textContent = calculator.currentOperatingScreen;
    return;
  }

  if (calculator.secondOperand) {
    currentOperatingScreen.textContent = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
    return;
  }

  if (calculator.currentOperator) {
    currentOperatingScreen.textContent = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)}`;
    return;
  }

  if (calculator.firstOperand) {
    currentOperatingScreen.textContent = `${calculator.firstOperand}`;
    return;
  }

}

function updateCurrentScreenUI() {
  if (!calculator.currentScreen) return;
  const currentScreen = document.querySelector('.current-screen');
  currentScreen.textContent = calculator.currentScreen;
}


function getOperatorSymbol(operator) {
  if (operator === 'addition') return '+';
  if (operator === 'subtraction') return '-';
  if (operator === 'multiplication') return 'x';
  if (operator === 'division') return '÷';
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

  calculator.currentOperator = operator;
  //if last button was equal
  if (calculator.lastButton === 'equal') {
    calculator.lastButton = 'operator';
    calculator.currentScreen = '';
    return;
  }

  if (calculator.currentOperand === 'second') {
    calculator.firstOperand = String(evaluate(calculator.currentOperator));
    calculator.secondOperand = '';
  } else {
    calculator.currentOperand = 'second';
  }

  calculator.lastButton = 'operator';
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


function processEqualButton() {
  if (!calculator.firstOperand || !calculator.secondOperand) return;
  const result = String(evaluate(calculator.currentOperator));

  calculator.currentScreen = result;
  calculator.currentOperatingScreen = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand} =`;

  calculator.firstOperand = result;
  calculator.secondOperand = '';
  calculator.currentOperand = 'second';
  calculator.currentOperator = null;
  calculator.lastButton = 'equal';
}



(function() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => button.addEventListener('click', processButton));
})();