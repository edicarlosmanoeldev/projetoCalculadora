// aqui onde vou inserir meu contrato
// tem que ter tailWind
// a página html tem que ter um elemento table com id
// são necessarios 2 arrays para a geração da tabela
// um array de dados, melhor falando o columnLabel
// um array com objeto que caracterizam a coluna, ou seja, o accessor
// e um elemento que não é obrigatório, mas pode passar uma função de formatação
const isNonEnptyArray = (arrayElement) => {
  return Array.isArray(arrayElement);
};
export const createTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNonEnptyArray(columnsArray) ||
    !isNonEnptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error("elementos precisam ser todos preenchidos corretamentes");
  }
  const tableElement = document.getElementById("results-table");
  if (!tableElement || tableElement.nodeName !== "TABLE") {
    throw new Error("Id inválido");
  }
  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement, dataArray, columnsArray);
};
function createTableHeader(tableRefere, columnsArray) {
  function createTheadElement(tableRefence) {
    const thead = document.createElement("thead");
    tableRefence.appendChild(thead);
    return thead;
  }
  const tableHeadReference =
    tableRefere.querySelector("thead") ?? createTheadElement(tableRefere);
  const headerHow = document.createElement("tr");
  ["bg-blue-900", "text-slate-200", "sticky", "top-0"].forEach((cssStyle) =>
    headerHow.classList.add(cssStyle),
  );

  for (const tableColumnObject of columnsArray) {
    const headElement = /*HTMl*/ `<th class="text-center">${tableColumnObject.columnLabel}</th>`;
    headerHow.innerHTML += headElement;
  }

  tableHeadReference.appendChild(headerHow);
}
function createTableBody(tableReference, tableItens, columnsArray) {
  function createBodyElement(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }

  const tableBodyReference =
    tableReference.querySelector("tbody") ?? createBodyElement(tableReference);

  for (const [itemIndex, tableItem] of tableItens.entries()) {
    const tbodyrow = document.createElement("tr");
    if (itemIndex % 2 !== 0) {
      tbodyrow.classList.add("bg-blue-200");
    }

    for (const tableColumn of columnsArray) {
      const formaTb = tableColumn.format ?? ((info) => info);
      tbodyrow.innerHTML += /*HTML */ `<td class="text-center">${formaTb(tableItem[tableColumn.accessor])} </td>`;
    }
    tableBodyReference.appendChild(tbodyrow);
  }
}
