import { useState } from "react";
import NumberInput from "./NumberInput";
import SelectBox from "./SelectBox";

const MONTHS = [{ value: "", label: "" }].concat(
  "January February March April May June July August September October November December"
    .split(" ")
    .map((item, index) => ({ value: index + 1, label: item }))
);

const DAYS = [{ value: "", label: "" }].concat(
  new Array(31).fill().map((_, index) => ({ value: `${index + 1}`, label: `${index + 1}` }))
);

function createDateString(year, month, day) {
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  return `${month}-${day}-${year}`;
}

function checkDateString(date) {
  return !isNaN(new Date(date).getTime());
}

function getDayCount(year, month) {
  year = parseInt(year);
  month = parseInt(month);
  if (month === 2) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 == 0) ? 30 : 29;
  }
  if ([4, 6, 9, 11].includes(month)) return 31;
  return 32;
}

export default function DateInput({ name, label, required, onChange }) {
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: ""
  });

  const [state, setState] = useState({
    value: "",
    isValid: !required,
    isPristine: true
  });

  const _onChange = (value) => {
    const newDate = { ...date, ...value };
    const dateString = createDateString(newDate.year, newDate.month, newDate.day);
    const isEmpty = !newDate.year && !newDate.month && !newDate.day;
    const isValid = (!required && isEmpty) || checkDateString(dateString);
    setDate(newDate);
    setState({ value: isEmpty ? "" : dateString, isValid, isPristine: false });
    if (onChange) onChange({ [name]: { value: dateString, isValid } });
  };

  const dayCount = getDayCount(date.year, date.month);

  return (
    <label className="block mb-4">
      <span className="text-gray-500 text-sm">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
      <div className="grid grid-cols-3 gap-2">
        <NumberInput
          name="year"
          label="Year"
          min={1600}
          max={2100}
          onChange={(state) => _onChange({ year: state.year.value })}
        />
        <SelectBox
          name="month"
          label="Month"
          values={MONTHS}
          onChange={(state) => _onChange({ month: state.month.value })}
        ></SelectBox>
        <SelectBox
          name="day"
          label="Day"
          values={DAYS.slice(0, dayCount)}
          onChange={(state) => _onChange({ day: state.day.value })}
        ></SelectBox>
      </div>
      {!state.isPristine && !state.isValid && (
        <div className="text-red-400 text-sm -mt-4">Date is invalid.</div>
      )}
    </label>
  );
}
