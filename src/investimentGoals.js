function convertToMonthlyReturnRata(yearReturnRata) {
  return yearReturnRata ** (1 / 12);
}

function generataReturnArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribuition = 0,
  returnRata = 0,
  returnTimeFrame = "monthly",
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Investimentos Iniciais e prazo devem ser valores positivos",
    );
  }

  // aqui estamos garantindo que ser for més ou ano a taxa ela já está convertida
  const finalReturnRata =
    returnTimeFrame === "monthly"
      ? 1 + returnRata / 100
      : convertToMonthlyReturnRata(1 + returnRata / 100);
  // aqui estamos verificando se a prazo ele é mês ou ano, se for ano já está sendo convertido

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;
  // estamos criado referencia de objetos

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0,
    totalInterestReturns: 0,
    month: 0,
    totalAmount: 0,
  };

  const returnArray = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * finalReturnRata +
      monthlyContribuition;

    const interestReturns =
      returnArray[timeReference - 1].totalAmount * finalReturnRata;
    const investedAmount =
      startingAmount + monthlyContribuition * timeReference;

    const totalInterestReturns = totalAmount - investedAmount;

    returnArray.push({
      investedAmount: investedAmount,
      interestReturns: interestReturns,
      totalInterestReturns: totalInterestReturns,
      month: timeReference,
      totalAmount: totalAmount,
    });
  }
  return returnArray;
}
