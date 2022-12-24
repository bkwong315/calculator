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

const parseSubtraction = () => {
  let equation = document.querySelector(".equation");
  let parsedEquation = equation.textContent.split(/([+\-*/])/g);

  for (let i = 0; i < parsedEquation.length; i++) {
    if (parsedEquation[i] === "-" && i > 0) {
      parsedEquation[i + 1] *= -1;
      parsedEquation[i] = "+";
    }
  }

  return parsedEquation;
};

const evaluate = () => {
  const result = document.querySelector(".result");
  let parsedEquation = parseSubtraction();

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
          prevNum = parseFloat(parsedEquation[i - 1]);
          nextNum = parseFloat(parsedEquation[i + 1]);
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
          prevNum = parseFloat(parsedEquation[i - 1]);
          nextNum = parseFloat(parsedEquation[i + 1]);
        }
      }
      parsedEquation.splice(
        prevNumIdx,
        3,
        operate(prevNum, nextNum, operation)
      );
    }
  }

  result.textContent = Math.round(parsedEquation * 100) / 100;
};

window.addEventListener("load", (e) => {
  const displayBtns = document.querySelectorAll(".btn:not(.no-display)");
  const equalBtn = document.querySelector(".equal-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const delBtn = document.querySelector(".del-btn");
  const decimalBtn = document.querySelector(".decimal-btn");
  const signBtn = document.querySelector(".sign-btn");

  displayBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const equation = document.querySelector(".equation");
      equation.textContent += e.target.getAttribute("value");
    });
  });

  equalBtn.addEventListener("click", evaluate);

  clearBtn.addEventListener(
    "click",
    (e) => (document.querySelector(".equation").textContent = "")
  );

  delBtn.addEventListener("click", (e) => {
    const equation = document.querySelector(".equation");
    equation.textContent = equation.textContent.slice(0, -1);
  });

  decimalBtn.addEventListener("click", (e) => {
    const equation = document.querySelector(".equation");
    let numbers = equation.textContent.split(/([+\-*/])/g);
    let lastNum = numbers[numbers.length - 1];

    if (lastNum.match(/\./g).length > 1) {
      lastNum = lastNum.slice(0, -1);
    }

    numbers[numbers.length - 1] = lastNum;
    equation.textContent = numbers.join("");
  });

  signBtn.addEventListener("click", (e) => {
    const equation = document.querySelector(".equation");
    let numbers = equation.textContent
      .split(/([+\-*/])/g)
      .filter((element) => element !== "");
    let lastNum;

    console.log(numbers);
    if (
      numbers.length > 2 &&
      numbers[numbers.length - 2] === "-" &&
      numbers[numbers.length - 3].match(/[/+\-*/]/g) !== null
    ) {
      console.log("MATCH 1");
      lastNum = numbers[numbers.length - 2] + numbers[numbers.length - 1];
      numbers.splice(numbers.length - 2, 2, lastNum);
    } else if (
      numbers.length > 2 &&
      numbers[numbers.length - 2] === "-" &&
      numbers[numbers.length - 3].match(/\d*/g) !== null
    ) {
      console.log("MATCH 2");
      numbers[numbers.length - 1];
    } else if (numbers.length > 1 && numbers[numbers.length - 2] === "-") {
      console.log("MATCH 3");
      lastNum = numbers[numbers.length - 2] + numbers[numbers.length - 1];
      numbers.splice(numbers.length - 2, 2, lastNum);
    }

    numbers[numbers.length - 1] *= -1;
    console.log(numbers);

    /* console.log(numbers);
    console.log(lastNum); */
    console.log(numbers.join(""));

    equation.textContent = numbers.join("");
  });
});
