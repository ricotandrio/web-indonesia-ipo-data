export class DateUtil {
  static formatToLongDate(date_string: string): string {
    if (!date_string) {
      return "";
    }

    const [day, month, year] = date_string.split("/");

    return `${day} ${DateUtil.getMonthName(parseInt(month, 10))} ${year}`;
  }

  static getMonthName(month: number): string {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "October",
      "November",
      "Desember",
    ];

    return months[month - 1] || "Invalid Month";
  }
}
