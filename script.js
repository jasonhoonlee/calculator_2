


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
  calculator.lastOperation = null;
}





function updateCurrentOperatingScreenUI(buttonType) {

  const currentOperatingScreen = document.querySelector('.current-operating-screen');

  if (buttonType === 'equal') {
    currentOperatingScreen.textContent = calculator.lastOperation;
    return;
  }

  let firstOperand;
  let secondOperand;

  firstOperand = calculator.firstOperand.includes('-') ? `(${calculator.firstOperand})` : calculator.firstOperand;

  secondOperand = calculator.secondOperand.includes('-') ? `(${calculator.secondOperand})` : calculator.secondOperand;

  //if first and second operand are defined
  if (calculator.secondOperand) {
    currentOperatingScreen.textContent =`${firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${secondOperand}`;
    return;
  }

  //if current operator is defined
  if (calculator.currentOperator) {
    currentOperatingScreen.textContent =`${firstOperand} ${getOperatorSymbol(calculator.currentOperator)}`;
    return
  }

  //if first operand is only defined
  if (calculator.firstOperand) {
    currentOperatingScreen.textContent =`${firstOperand}`;
    return;
  }

}





function updateCurrentScreenUI() {
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
  if (calculator.lastButton === 'percentage' || calculator.lastButton === 'one-over' || calculator.lastButton === 'radical') {
    return;
  }

  if (calculator.currentOperand === 'first') {
    calculator.firstOperand += value;
    calculator.lastOperation = `${calculator.firstOperand}`;
  } else {
    calculator.secondOperand += value;
    calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
  }
  calculator.lastButton = 'number';
  calculator.currentScreen = '';

  console.log(calculator)
}

function processOperatorButton(operator) {
  if (calculator.lastButton === 'operator') return;
  if (!calculator.firstOperand) return;

  if (calculator.firstOperand && calculator.secondOperand) {
    calculator.firstOperand = String(evaluate(calculator.currentOperator));
    calculator.secondOperand = '';
  }

  calculator.currentOperand = 'second';
  calculator.currentOperator = operator;
  calculator.lastButton = 'operator';
  calculator.currentScreen = '';

  calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)}`;

  console.log(calculator)
}

function processEqualButton() {
  if (calculator.lastButton === 'equal') return;
  if (calculator.lastButton === 'operator') return;
  if (!calculator.firstOperand || !calculator.secondOperand) return;

  //update last operation
  calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand} =`
  //update right operand
  const result = String(evaluate(calculator.currentOperator));
  calculator.firstOperand = result;
  calculator.secondOperand = '';
  //update current operand
  calculator.currentOperand = 'second';
  //update last button
  calculator.lastButton = 'equal';
  //update current screen
  calculator.currentScreen = result;


  console.log(calculator)
}



function processSignButton() {

    if (calculator.lastButton === 'percentage') return;
    if (calculator.lastButton === 'one-over') return;
    if (calculator.lastButton === 'radical') return;

    if (calculator.currentOperand === 'first') {
      if (calculator.firstOperand.includes('-')) {
        calculator.firstOperand = calculator.firstOperand.slice(1, calculator.firstOperand.length);
      } else {
        calculator.firstOperand = '-' + calculator.firstOperand;
      }
      calculator.lastOperation = `${calculator.firstOperand}`;
    } else {
      if (calculator.secondOperand.includes('-')) {
        calculator.secondOperand = calculator.secondOperand.slice(1, calculator.secondOperand.length);
      } else {
        calculator.secondOperand = '-' + calculator.secondOperand;
      }
      calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
    }

    calculator.lastButton === 'sign';
    calculator.currentScreen = '';

}


function processDecimalButton() {
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand.includes('.')) return;
    calculator.firstOperand = calculator.firstOperand + '.';
    calculator.lastOperation = `${calculator.firstOperand}`;
  } else {
    if (calculator.secondOperand.includes('.')) return;
    calculator.secondOperand = calculator.secondOperand + '.';
    calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
  }

  if (calculator.lastButton === 'percentage') return;
  if (calculator.lastButton === 'one-over') return;
  if (calculator.lastButton === 'radical') return;

  calculator.lastButton = 'decimal';

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