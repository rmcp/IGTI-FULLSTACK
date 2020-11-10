const formatter = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatterPercent = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

function formatNumber(value) {
  return formatter.format(parseFloat(value));
}

function formatPercentual(value, total) {
  value = parseFloat(value);
  total = parseFloat(total);

  return formatterPercent.format((value / total) * 100);
}

export { formatNumber, formatPercentual };
