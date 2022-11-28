
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

  if (calculator.secondOperand) {
    calculator.lastOperation = `${firstOperand} ${calculator.currentOperator} ${secondOperand} =`;
    return;
  }

  if (calculator.currentOperator) {
    calculator.lastOperation = `${firstOperand} ${calculator.currentOperator}`;
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