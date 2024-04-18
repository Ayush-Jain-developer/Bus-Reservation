import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ handleDateOnChange, value }) => {
  return (
    <Datepicker
      useRange={false}
      asSingle={true}
      value={value}
      onChange={handleDateOnChange}
      minDate={new Date()}
    />
  );
};
export default DatePicker;
