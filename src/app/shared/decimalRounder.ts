export class DecimalRounder {
    public roundNum(val: number, decimal: number): number {
        const format = (num, dec) => num.toLocaleString('en-US', {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec,
        });
        return format(val, decimal);
      }
}