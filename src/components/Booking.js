import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Deck from "./Deck";
import DatePicker from "./Datepicker";
import BusReservationForm from "./RegistrationForm";
import { bookingActions } from "../redux/slices/bookingSlice";

const Booking = () => {
  let [bookingData, setBookingData] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [isEmailChanged, setEmailChange] = useState(false);
  const [isButtonActive, setReserveButton] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { addBooking } = bookingActions;
  const dispatch = useDispatch();
  const bookingsAllData = useSelector((state) => state.bookings.bookings);
  const selectedDateData = bookingsAllData[value.startDate];

  const handleDateOnChange = (date) => {
    setValue(date);
  };
  const handleSeatOnClick = (seat) => {
    setShowPopup(true);
    setSelectedSeat(seat);
  };
  const handleReserveClick = (e, name, email) => {
    e.preventDefault();
    setSelectedSeat(null);
    setShowPopup(false);
    setEmailChange(false);
    setReserveButton(true);
    setBookingData({
      dateOfBooking: value.startDate,
      seatNumber: selectedSeat,
      name,
      email,
    });
    toast.success("Booking successful");
  };
  useEffect(() => {
    if (bookingData.name && bookingData.email) {
      dispatch(addBooking(bookingData));
    }
  }, [bookingData, addBooking, dispatch]);
  return (
    <>
      <div className="flex mx-12 justify-center justify-items-center	">
        <div className="grid grid-cols-1 mr-4">
          <div className="mt-20 flex flex-col">
            <div className="bg-primary rounded p-4 shadow-md">
              <h1 className="text-secondary-100 font-serif text-xl mb-2">
                Select Date:
              </h1>
              <DatePicker
                className="border border-gray rounded px-3 py-2 focus:outline-none focus:border-primary"
                handleDateOnChange={handleDateOnChange}
                value={value}
              />
            </div>
            <div className="mt-2">
              <BusReservationForm
                handleReserveClick={handleReserveClick}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
                isButtonActive={isButtonActive}
                setReserveButton={setReserveButton}
                isEmailChanged={isEmailChanged}
                setEmailChange={setEmailChange}
                selectedSeat={selectedSeat}
                setSelectedSeat={setSelectedSeat}
                value={value}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 ml-4">
          <div className="col-span-6">
            <h1 className="bg-primary text-white w-100 mt-10 px-2 py-2">
              Click on an available seat to proceed with your booking
            </h1>
            <div
              className={` flex items-start flex-col ${
                !value.startDate
                  ? "opacity-50 pointer-events-none cursor-not-allowed"
                  : ""
              }`}
            >
              <Deck
                handleSeatOnClick={handleSeatOnClick}
                selectedSeat={selectedSeat}
                selectedDateData={selectedDateData}
                date={value.startDate}
              />
              <Deck
                isLowerDeck={false}
                handleSeatOnClick={handleSeatOnClick}
                selectedSeat={selectedSeat}
                selectedDateData={selectedDateData}
                date={value.startDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
