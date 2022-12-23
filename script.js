const add = (a, b) => a + b;

const sub = (a, b) => a - b;

const mult = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (num1, num2, operation) => {
  let result = 0;

  switch (operation) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = sub(num1, num2);
      break;
    case "*":
      result = mult(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      console.log(`Operation ${operation} is not supported.`);
  }

  return result;
};

const evaluate = () => {
  const display = document.querySelector(".display");

  let equation = display.textContent;
  let parsedEquation = equation.split(/([+\-*/])/g);

  while (parsedEquation.length > 1) {
    let prevNum;
    let prevNumIdx;
    let nextNum;
    let operation;

    if (
      parsedEquation.filter((element) => (element === "*") | (element === "/"))
        .length > 0
    ) {
      for (let i = 0; i < parsedEquation.length; i++) {
        if (parsedEquation[i] === "*" || parsedEquation[i] === "/") {
          operation = parsedEquation[i];
          prevNumIdx = i - 1;
          prevNum = parseInt(parsedEquation[i - 1]);
          nextNum = parseInt(parsedEquation[i + 1]);
        }
      }
      parsedEquation.splice(
        prevNumIdx,
        3,
        operate(prevNum, nextNum, operation)
      );
    } else if (
      parsedEquation.filter((element) => (element === "+") | (element === "-"))
        .length > 0
    ) {
      for (let i = 0; i < parsedEquation.length; i++) {
        if (parsedEquation[i] === "+" || parsedEquation[i] === "-") {
          operation = parsedEquation[i];
          prevNumIdx = i - 1;
          prevNum = parseInt(parsedEquation[i - 1]);
          nextNum = parseInt(parsedEquation[i + 1]);
        }
      }
      parsedEquation.splice(
        prevNumIdx,
        3,
        operate(prevNum, nextNum, operation)
      );
    }
  }

  console.log(parsedEquation);
};

window.addEventListener("load", (e) => {
  const displayBtns = document.querySelectorAll(".btn:not(.no-display)");
  const equalBtn = document.querySelector(".equal-btn");

  displayBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const display = document.querySelector(".display");
      display.textContent += e.target.getAttribute("value");
    });
  });

  equalBtn.addEventListener("click", evaluate);
});
