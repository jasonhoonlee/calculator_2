
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
}
