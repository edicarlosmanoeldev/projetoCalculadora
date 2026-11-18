/* aqui vai ser feita uma especie de contrato */
const isNonEmptyArray = (referenceElement) => {
  return Array.isArray(referenceElement) && referenceElement.length > 0;
};
export const createTable = (columnsArray, dataArray, idTable) => {
  if (
    !isNonEmptyArray(columnsArray) ||
    !isNonEmptyArray(dataArray) ||
    !idTable
  ) {
    throw new Error("Todos os elementos devem ser preenchidos corretamentes");
  }

  const referenceElement = document.getElementById("results-table");

  if (!referenceElement || referenceElement.nodeName !== "TABLE") {
    throw new Error("ID está inválido");
  }
  createTheadTable(referenceElement, columnsArray);
  createbodyTable(referenceElement, dataArray, columnsArray);
};

function createTheadTable(tableReference, columnsArray) {
  function createElementThead(tableReference) {
    const thead = document.createElement("thead");
    tableReference.appendChild(thead);
    return thead;
  }

  const referenceTableElement =
    tableReference.querySelector("thead") ?? createElementThead(tableReference);

  const howHead = document.createElement("tr");
  ["bg-blue-900", "text-slate-200", "sticky", "top-0", "py-16"].forEach(
    (cssStyle) => howHead.classList.add(cssStyle),
  );

  for (const columnObjectArray of columnsArray) {
    const headElement = /*HTML */ `<th class="text-center">${columnObjectArray.columnLabel}</th>`;
    howHead.innerHTML += headElement;
  }
  referenceTableElement.appendChild(howHead);
}

function createbodyTable(tableReference, tableItens, columnsArray) {
  function createElementBody(tableReference) {
    const tbody = document.createElement("tbody");
    tableReference.appendChild(tbody);
    return tbody;
  }
  const referenceTableElement =
    tableReference.querySelector("tbody") ?? createElementBody(tableReference);

  for (const [idIndex, tableItem] of tableItens.entries()) {
    const howTbody = document.createElement("tr");
    if (idIndex % 2 !== 0) {
      howTbody.classList.add("bg-blue-300");
    }

    for (const tableColumn of columnsArray) {
      const format = tableColumn.format ?? ((info) => info);
      howTbody.innerHTML += /*HTML*/ `<td class="text-center">${format(tableItem[tableColumn.accessor])}</td>`;
    }
    referenceTableElement.appendChild(howTbody);
  }
}
