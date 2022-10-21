


const calculator = {
  currentScreen: '',
  firstOperand: '',
  secondOperand: '',
  currentOperand: 'first',
}




function buildCurrentOperand(e) {
  const clickedButton = e.target;
  if (clickedButton.classList.contains('number')) {
    if (calculator.currentOperand === 'first') {
      calculator.firstOperand += clickedButton.textContent;
    } else {
      calculator.secondOperand += clickedButton.textContent;
    }
  }
}





(function() {
  //query selectors
  const buttons = document.querySelectorAll('.btn');

  //event listeners
  buttons.forEach(button => button.addEventListener('click', buildCurrentOperand));
})()