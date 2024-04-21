import { useRef, useState } from "react";

const BusReservationForm = ({
  handleReserveClick,
  showPopup,
  setShowPopup,
  setReserveButton,
  isButtonActive,
  setFormChanges,
  resFormChanges,
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
    setFormChanges({
      ...resFormChanges,
      isEmailChanged: true,
    });
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = !regex.test(e.target.value);
    setError({
      ...error,
      emailError: emailError ? true : false,
    });
    if (
      !error.bookingEmailError &&
      !error.nameError &&
      resFormChanges.isNameChanged
    )
      setReserveButton(false);
  };
  const handleNameChange = (e) => {
    setFormChanges({
      ...resFormChanges,
      isNameChanged: true,
    });
    setError({
      ...error,
      nameError: e.target.value.trim() ? false : true,
    });
    if (!error.emailError && !error.nameError && resFormChanges.isEmailChanged)
      setReserveButton(false);
  };
  const handleCancel = () => {
    setFormChanges({
      isNameChanged: false,
      isEmailChanged: false,
    });
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
      (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
          <div className="px-6 py-4">
            <h2
              className="text-xl font-semibold text-gray-800 mb-2"
              data-testid={"Heading"}
            >
              Bus Reservation Form
            </h2>
            <form>
              <div className="mb-4 flex justify-between">
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium mb-2"
                  data-testid={"seat"}
                >
                  Seat #:{selectedSeat}
                </label>
                <label
                  htmlFor="date"
                  className="block text-gray-700 font-medium mb-2"
                  data-testid={"date"}
                >
                  Date #:{dateOfBooking}
                </label>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                  data-testid={"name"}
                >
                  Name
                </label>
                <input
                  data-testid={"nameInput"}
                  ref={references.nameRef}
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                />
                {error.nameError && (
                  <p className="text-error" data-testid={"nameError"}>
                    Name is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                  data-testid={"email"}
                >
                  Email
                </label>
                <input
                  data-testid={"emailInput"}
                  ref={references.emailRef}
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleEmailOnChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-primary"
                />
                {error.emailError ? (
                  <p className="text-error" data-testid={"emailError"}>
                    Please enter a valid email
                  </p>
                ) : null}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-white text-primary px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80 border border-2"
                  onClick={handleCancel}
                  data-testid={"cancel"}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:bg-opacity-80 ${
                    isButtonActive || error.emailError || error.nameError
                      ? "opacity-50 pointer-events-none cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    handleReserveClick(
                      references.nameRef.current.value,
                      references.emailRef.current.value
                    )
                  }
                  data-testid={"reserve"}
                >
                  Reserve Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default BusReservationForm;
