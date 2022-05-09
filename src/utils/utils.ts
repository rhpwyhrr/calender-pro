interface YearMonthDay {
  year: number;
  month: number;
  day: number;
}
const getYearMonthDay = (date: Date): YearMonthDay => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

const getDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day);
};

export { getYearMonthDay, getDate };
