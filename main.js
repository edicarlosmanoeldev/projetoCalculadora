import { generataReturnArray } from "./src/investimentGoals.js";
// const buttonClick = document.getElementById("calculate-results");
const form = document.getElementById("investment-form");

function renderProgression(e) {
  e.preventDefault();
  //também existe outra forma de selecionr as tag
  // const startingAmount = Number(
  //   document.getElementById("starting-amount").value,
  // );
  const startingAmount = Number(
    form["starting-amount"].value.replace(",", "."),
  ); // mas para isso funcionar tem que ter a tag  name no input
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value,
  );
  const timeAmount = Number(
    document.getElementById("time-amount").value.replace(",", "."),
  );
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRata = Number(
    document.getElementById("return-rata").value.replace(",", "."),
  );
  const returnRataPeriod = document.getElementById("evolution-period").value;
  const taxRata = Number(
    document.getElementById("tax-rata").value.replace(",", "."),
  );

  const returnsArray = generataReturnArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRata,
    returnRataPeriod,
  );

  console.log(returnsArray);
}

function clearInput() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["time-amount-period"].value = "";
  form["return-rata"].value = "";
  form["evolution-period"].value = "";
  form["tax-rata"].value = "";

  const errorInputContainers = document.querySelectorAll(".error");

  for (let errorContainer of errorInputContainers) {
    errorContainer.classList.remove("error");
    errorContainer.parentElement.querySelector("p").remove();
  }
}

function validarInput(e) {
  if (e.target.value === "") {
    return;
  }
  const validarInput = e.target.value.replace(",", ".");
  const parentElement = e.target.parentElement;
  const grandParentElement = e.target.parentElement.parentElement;

  if (
    (!parentElement.classList.contains("error") && isNaN(validarInput)) ||
    Number(validarInput <= 0)
  ) {
    const errorInput = document.createElement("p");
    errorInput.classList.add("text-red-500");
    errorInput.innerHTML = `<p>apenas números maiores que 0 (zero)</p>`;
    parentElement.classList.add("error");
    grandParentElement.appendChild(errorInput);
  } else if (
    (parentElement.classList.contains("error") && !isNaN(validarInput)) ||
    Number(validarInput <= 0)
  ) {
    parentElement.classList.remove("error");
    grandParentElement.querySelector("p").remove();
  }
}

for (let formElement of form) {
  if (formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
    formElement.addEventListener("blur", validarInput);
  }
}
//  tenho outra forma alternada para evitar o vento de submit
form.addEventListener("submit", renderProgression);

// buttonClick.addEventListener("click", renderProgression);
clearButton.addEventListener("click", clearInput);
