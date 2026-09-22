import { calculateSum } from "./calculator.js";

const form = document.querySelector("#calculator");
const inputs = {
  first: document.querySelector("#first"),
  second: document.querySelector("#second"),
};
const errorMessages = {
  first: document.querySelector("#first-error"),
  second: document.querySelector("#second-error"),
};
const result = document.querySelector("#result");
const errorSummary = document.querySelector("#error-summary");

function clearFeedback() {
  result.value = "";
  errorSummary.textContent = "";
  for (const name of Object.keys(inputs)) {
    inputs[name].removeAttribute("aria-invalid");
    errorMessages[name].textContent = "";
  }
}

form.addEventListener("input", clearFeedback);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFeedback();
  const calculation = calculateSum(inputs.first.value, inputs.second.value);

  if (calculation.ok) {
    result.value = String(calculation.value);
    return;
  }

  const errors = Object.entries(calculation.errors);
  for (const [name, message] of errors) {
    inputs[name].setAttribute("aria-invalid", "true");
    errorMessages[name].textContent = message;
  }
  errorSummary.textContent = errors.map(([name, message]) =>
    `${name === "first" ? "First" : "Second"} number: ${message}`
  ).join(" ");
  inputs[errors[0][0]].focus();
});

document.querySelector("#add").disabled = false;
