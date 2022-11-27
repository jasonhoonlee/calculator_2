
(function(){

  let buttons = document.querySelectorAll('.btn');
  buttons = Array.from(buttons);
  buttons.forEach(button => {
    button.addEventListener('click', processButton)
  })

})();

const calculator = {
  currentOperator: null,
  currentOperand: 'first',
  firstOperand: '',
  secondOperand: '',
  lastButton: null,
  lastOperation: '',
  currentScreen: '',
}

