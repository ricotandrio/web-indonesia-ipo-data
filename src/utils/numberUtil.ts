export class NumberUtil {
  static formatToRupiah(amount: number | string): string {
    const parsed = Number(amount);

    if (isNaN(parsed)) {
      return "Rp. 0";
    }

    return `Rp. ${parsed.toFixed(0)}`;
  }

  static toDotNumber(amount: number | string): string {
    const parsed = Number(amount);

    if (isNaN(parsed)) {
      return "0";
    }

    return parsed.toLocaleString("id-ID");
  }
}
