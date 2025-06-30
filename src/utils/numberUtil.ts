export class NumberUtil {
  static formatToRupiah(amount: number): string {
    if (isNaN(amount)) {
      return "Rp. 0";
    }

    return `Rp. ${amount.toFixed(0)}`;
  }

  static toDotNumber(amount: number): string {
    if (isNaN(amount)) {
      return "0";
    }

    return amount.toLocaleString("id-ID");
  }
}
