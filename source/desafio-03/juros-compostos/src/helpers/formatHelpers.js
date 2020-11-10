const formatter = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatterPercent = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 2,
});

function formatMoney(value) {
  return formatter.format(parseFloat(value));
}

function formatPercentual(value) {
  value = parseFloat(value);

  return formatterPercent.format(value);
}

export { formatMoney, formatPercentual };
