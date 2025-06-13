export interface OHLC_DATA{
    open: number,
    close: number,
    high: number,
    low: number,
    time: number,
  }

export interface TimeFrame {
  label: string;
  value:"minute" | "day" | "month" | "week" | "hour" | "quarter";
}