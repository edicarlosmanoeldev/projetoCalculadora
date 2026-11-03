import { generataReturnArray } from "./src/investimentGoals.js";
// const buttonClick = document.getElementById("calculate-results");
const form = document.getElementById("investment-form");

function renderProgression(e) {
  e.preventDefault();
  //também existe outra forma de selecionr as tag
  // const startingAmount = Number(
  //   document.getElementById("starting-amount").value,
  // );
  const startingAmount = Number(form["starting-amount"].value); // mas para isso funcionar tem que ter a tag  name no input
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value,
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRata = Number(document.getElementById("return-rata").value);
  const returnRataPeriod = document.getElementById("evolution-period").value;
  const taxRata = Number(document.getElementById("tax-rata").value);

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
//  tenho outra forma alternada para evitar o vento de submit
form.addEventListener("submit", renderProgression);
// buttonClick.addEventListener("click", renderProgression);
