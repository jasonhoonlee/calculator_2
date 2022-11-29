
(function(){

  let buttons = document.querySelectorAll('.btn');
  buttons = Array.from(buttons);
  buttons.forEach(button => {
    button.addEventListener('click', processButton)
  })

})();

const calculator = {
  currentOperator: null,
  currentOperand: null,
  firstOperand: '',
  secondOperand: '',
  lastButton: null,
  lastOperation: null,
  currentScreen: null,
}

function processButton(e) {
  const buttonType = e.target.classList[1];
  if (!calculator.currentOperand && buttonType !== 'number') return;
  if (buttonType === 'number') processNumberButton(e);
  if (buttonType === 'decimal') processDecimalButton();
  if (buttonType === 'sign') processSignButton();
  if (buttonType === 'delete') processDeleteButton();
  if (buttonType === 'clear') processClearButton();
  if (buttonType === 'addition') processAddButton();
  if (buttonType === 'subtraction') processSubtractButton();
  if (buttonType === 'division') processDivideButton();
  if (buttonType === 'multiplication') processMultiplicationButton();
}

function processNumberButton(e) {
  const number = e.target.textContent;
  updateOperands(number);
  updateLastOperation();
  calculator.lastButton = 'number';
  calculator.currentScreen = '';
}

function updateOperands(number) {
  if (!calculator.currentOperand) calculator.currentOperand = 'first';
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand += number;
    return;
  }
  if (calculator.currentOperand === 'second') {
    calculator.secondOperand += number;
    return;
  }
}

function updateLastOperation() {

  const firstOperand = calculator.firstOperand.includes('-') ? `(${calculator.firstOperand})` : calculator.firstOperand;
  const secondOperand = calculator.secondOperand.includes('-') ? `(${calculator.secondOperand})`: calculator.secondOperand;
  const currentOperator = calculator.currentOperator;

  if (calculator.secondOperand) {
    calculator.lastOperation = `${firstOperand} ${getOperatorSymbol(currentOperator)} ${secondOperand} =`;
    return;
  }

  if (currentOperator) {
    calculator.lastOperation = `${firstOperand} ${getOperatorSymbol(currentOperator)}`;
    return;
  }

  if (calculator.firstOperand) {
    calculator.lastOperation = `${firstOperand}`;
    return;
  }
}

function processDecimalButton() {
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand.includes('.')) return;
  }
  if (calculator.currentOperand === 'second') {
    if (calculator.secondOperand.includes('.')) return;
  }
  updateOperandsWithDecimal();
  updateLastOperation();
  calculator.lastButton = 'decimal';
  calculator.currentScreen = '';
}

function updateOperandsWithDecimal() {
  if (!calculator.currentOperand) calculator.currentOperand = 'first';
  if (calculator.currentOperand === 'first') {
    calculator.firstOperand += '.';
    return;
  }
  if (calculator.currentOperand === 'second') {
    calculator.secondOperand += '.';
    return;
  }
}

function processSignButton() {
  updateOperandWithSign();
  updateLastOperation();
  calculator.lastButton = 'sign';
  calculator.currentScreen = '';
}


function updateOperandWithSign() {
  if (calculator.currentOperand === 'first') {
    if (!calculator.firstOperand.includes('-')) {
      calculator.firstOperand = `-${calculator.firstOperand}`;
    } else {
      calculator.firstOperand = calculator.firstOperand.slice(1, calculator.firstOperand.length);
    }
  } else {
    if (!calculator.secondOperand.includes('-')) {
      calculator.secondOperand = `-${calculator.secondOperand}`;
    } else {
      calculator.secondOperand = calculator.secondOperand.slice(1, calculator.secondOperand.length);
    }
  }
}


function processDeleteButton() {
  if (calculator.lastButton === 'equal') {
    resetCalculatorState();
    return;
  }
  updateOperandWithDelete();
  updateLastOperation();
  calculator.lastButton = 'delete';
  calculator.currentScreen = '';
}

function resetCalculatorState() {
  calculator.currentOperator = null;
  calculator.currentOperand = null;
  calculator.firstOperand = '';
  calculator.secondOperand = '';
  calculator.lastButton = null;
  calculator.lastOperation = null;
  calculator.currentScreen = '';
}

function updateOperandWithDelete() {
  if (calculator.secondOperand) {
    calculator.secondOperand = calculator.secondOperand.slice(0, calculator.secondOperand.length-1);
    return;
  }
  if (calculator.currentOperator) {
    calculator.currentOperator = null;
    return;
  }
  if (calculator.firstOperand) {
    calculator.firstOperand = calculator.firstOperand.slice(0, calculator.firstOperand.length-1);
    calculator.currentOperand = 'first';
    return;
  }
}

function processClearButton() {
  resetCalculatorState();
}


function getOperatorSymbol() {
  const operator = calculator.currentOperator;
  if (operator === 'multiplication') return '*';
  if (operator === 'division') return '÷';
  if (operator === 'addition') return '+';
  if (operator === 'subtraction') return '-';
}


function processAddButton() {
  if (calculator.firstOperand && calculator.secondOperand) {
    calculator.firstOperand = String(evaluate());
    calculator.secondOperand = '';
  }
  calculator.currentOperator = 'addition';
  calculator.lastButton = 'addition';
  calculator.currentOperand = 'second';
  calculator.clearScreen = '';
  updateLastOperation();
}


function evaluate() {
  const currentOperator = calculator.currentOperator;
  const firstOperand = calculator.firstOperand;
  const secondOperand = calculator.secondOperand;

  if (currentOperator === 'addition') return Number(firstOperand) + Number(secondOperand);
  if (currentOperator === 'subtraction') return Number(firstOperand) - Number(secondOperand);
  if (currentOperator === 'multiplication') return Number(firstOperand) * Number(secondOperand);
  if (currentOperator === 'division') return Number(firstOperand) / Number(secondOperand);
}

function processSubtractButton() {
  if (calculator.firstOperand && calculator.secondOperand) {
    calculator.firstOperand = String(evaluate());
    calculator.secondOperand = '';
  }
  calculator.currentOperator = 'subtraction';
  calculator.lastButton = 'subtraction';
  calculator.currentOperand = 'second';
  calculator.clearScreen = '';
  updateLastOperation();
}

function processDivideButton() {
  if (calculator.firstOperand && calculator.secondOperand) {
    calculator.firstOperand = String(evaluate());
    calculator.secondOperand = '';
  }
  calculator.currentOperator = 'division';
  calculator.lastButton = 'division';
  calculator.currentOperand = 'second';
  calculator.clearScreen = '';
  updateLastOperation();
}

function processMultiplicationButton() {
  if (calculator.firstOperand && calculator.secondOperand) {
    calculator.firstOperand = String(evaluate());
    calculator.secondOperand = '';
  }
  calculator.currentOperator = 'multiplication';
  calculator.lastButton = 'multiplication';
  calculator.currentOperand = 'second';
  calculator.clearScreen = '';
  updateLastOperation();
}