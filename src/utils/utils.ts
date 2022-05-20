interface YearMonthDay {
  year: number;
  month: number;
  day: number;
}

const getYearMonthDay = (date: any): YearMonthDay => {
  const mydate = new Date(date);
  const year = mydate.getFullYear();
  const month = mydate.getMonth();
  const day = mydate.getDate();
  return {
    year,
    month,
    day,
  };
};

const getDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day);
};

const compareDate = (d1: Date, d2: Date): boolean => {
  const { year, month, day } = getYearMonthDay(d1);
  const { year: year2, month: month2, day: day2 } = getYearMonthDay(d2);
  return year === year2 && month === month2 && day === day2;
};

const timeFormatter = (time: any, format = "YYYY-MM-DD hh:mm:ss"): string => {
  if (!time) {
    return "";
  }
  const t = new Date(time);
  const tf = function (i: number) {
    return (i < 10 ? "0" : "") + i;
  };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function (a): any {
    switch (a) {
      case "YYYY":
        return tf(t.getFullYear());
      case "MM":
        return tf(t.getMonth() + 1);
      case "mm":
        return tf(t.getMinutes());
      case "DD":
        return tf(t.getDate());
      case "hh":
        return tf(t.getHours());
      case "ss":
        return tf(t.getSeconds());
    }
  });
};

export { timeFormatter, getYearMonthDay, getDate, compareDate };
