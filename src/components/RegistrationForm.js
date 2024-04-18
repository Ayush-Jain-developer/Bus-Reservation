import { useRef, useState } from "react";

const BusReservationForm = ({
  handleReserveClick,
  showPopup,
  setShowPopup,
  setReserveButton,
  isButtonActive,
  setEmailChange,
  isEmailChanged,
  selectedSeat,
  setSelectedSeat,
  value,
}) => {
  const references = {
    nameRef: useRef(),
    emailRef: useRef(),
  };
  const [error, setError] = useState({
    emailError: false,
    nameError: false,
  });
  const dateOfBooking = new Date(value.startDate).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handleEmailOnChange = (e) => {
    setEmailChange(true);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = !regex.test(e.target.value);
    setError({
      ...error,
      emailError: emailError ? true : false,
    });
    if (!error.bookingEmailError && !error.nameError) setReserveButton(false);
  };
  const handleNameChange = (e) => {
    setError({
      ...error,
      nameError: e.target.value.trim() ? false : true,
    });
    if (!error.emailError && !error.nameError && isEmailChanged)
      setReserveButton(false);
  };
  const handleCancel = () => {
    setEmailChange(false);
    setReserveButton(true);
    setSelectedSeat(null);
    setShowPopup(false);
    setError({
      bookingEmailError: false,
      nameError: false,
    });
  };
  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Bus Reservation Form
              </h2>
              <form>
                <div className="mb-4 flex justify-between">
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Seat #: {selectedSeat}
                  </label>
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Date #:{dateOfBooking}
                  </label>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    ref={references.nameRef}
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleNameChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                  />
                  {error.nameError && (
                    <p className="text-error">Name is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    ref={references.emailRef}
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleEmailOnChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                  />
                  {error.emailError ? (
                    <p className="text-error">Please enter a valid email</p>
                  ) : null}
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-white text-primary px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80 border border-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80 ${
                      isButtonActive || error.emailError || error.nameError
                        ? "opacity-50 pointer-events-none cursor-not-allowed"
                        : ""
                    }`}
                    onClick={(e) =>
                      handleReserveClick(
                        e,
                        references.nameRef.current.value,
                        references.emailRef.current.value
                      )
                    }
                  >
                    Reserve Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusReservationForm;
