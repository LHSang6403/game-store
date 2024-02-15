export default function formatCurrency(number: any): string {
  const numberWithCommas = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return numberWithCommas;
}
