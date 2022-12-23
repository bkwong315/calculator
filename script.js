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

window.addEventListener("load", (e) => {
  const displayBtns = document.querySelectorAll(".btn:not(.no-display)");
  displayBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const display = document.querySelector(".display");
      display.textContent += e.target.getAttribute("value");
    });
  });
  console.log(displayBtns);
});
