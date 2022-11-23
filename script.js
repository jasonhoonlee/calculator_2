


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
    if (buttonInfo.type !== 'number' && buttonInfo.type !== 'decimal' && buttonInfo.type !== 'sign')  {
          return;
    }
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
    //parenthesize last operation
    const lastOperation = parenthesizeLastOperation(calculator.lastOperation);
    currentOperatingScreen.textContent = lastOperation;
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


function parenthesizeLastOperation(lastOperation) {
  console.log(lastOperation)
  lastOperation = lastOperation.split(' ')
                               .map(item => {
                                  if (item.includes('-') && item.length > 1) {
                                    item = `(${item})`
                                  }
                                  return item;
                               })
                               .join(' ');

 return lastOperation;

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
  if (calculator.lastButton === 'equal') {
    resetCalculatorState();
  }
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

}

function processEqualButton() {
  if (calculator.lastButton === 'equal') {
    resetCalculatorState();
    return;
  }
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

}



function processSignButton() {
    if (calculator.lastButton === 'equal') {
      resetCalculatorState();
    }
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
  if (calculator.lastButton === 'equal') {
    resetCalculatorState();
  }
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








function evaluateSpecialOperator(operator) {
  if (operator === 'radical') {
    if (calculator.currentOperand === 'first') {
      calculator.firstOperand = String(Math.sqrt(Number(calculator.firstOperand)));
    }
    if (calculator.currentOperand === 'second') {
      calculator.secondOperand = String(Math.sqrt(Number(calculator.secondOperand)));
    }
    return;
  }

  if (operator === 'percentage') {
    if (calculator.currentOperand === 'first') {
      calculator.firstOperand = String(Number(calculator.firstOperand)/100);
    }
    if (calculator.currentOperand === 'second') {
      calculator.secondOperand = String(Number(calculator.secondOperand)/100);
    }
    return;
  }

  if (operator === 'one-over') {
    if (calculator.currentOperand === 'first') {
      calculator.firstOperand = String(1/Number(calculator.firstOperand));
    }
    if (calculator.currentOperand === 'second') {
      calculator.secondOperand = String(1/Number(calculator.secondOperand));
    }
    return;
  }
}

function processPercentageButton() {

  if (calculator.lastButton === 'operator') return;
  if (calculator.lastButton === 'equal') {
    calculator.currentOperand = 'first';
   }
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand === '') return;
    evaluateSpecialOperator('percentage');
    calculator.lastOperation = `${calculator.firstOperand}`;
  } else {
    if (calculator.secondOperand === '') return;
    evaluateSpecialOperator('percentage');
     calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
  }
  calculator.lastButton = 'percentage';
  calculator.currentScreen = '';
}



function processOneOverButton() {

  if (calculator.lastButton === 'operator') return;
  if (calculator.lastButton === 'equal') {
    calculator.currentOperand = 'first';
   }
  if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand === '') return;
    evaluateSpecialOperator('one-over');
    calculator.lastOperation = `${calculator.firstOperand}`;
  }
  if (calculator.currentOperand === 'second') {
    if (calculator.secondOperand === '') return;
    evaluateSpecialOperator('one-over');
    calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
  }
  calculator.lastButton = 'one-over';
  calculator.currentScreen = '';
}



function processSquareRootButton() {

   if (calculator.lastButton === 'operator') return;
   if (calculator.lastButton === 'equal') {
    calculator.currentOperand = 'first';
   }
   if (calculator.currentOperand === 'first') {
    if (calculator.firstOperand.includes('-')) return;
    if (calculator.firstOperand === '') return;
    evaluateSpecialOperator('radical');
    calculator.lastOperation = `${calculator.firstOperand}`;
   }
   if (calculator.currentOperand === 'second') {
    if (calculator.secondOperand.includes('-')) return;
    if (calculator.secondOperand === '') return;
    console.log(calculator)
    evaluateSpecialOperator('radical');
    calculator.lastOperation = `${calculator.firstOperand} ${getOperatorSymbol(calculator.currentOperator)} ${calculator.secondOperand}`;
   }
   calculator.lastButton = 'radical';
   calculator.currentScreen = '';

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