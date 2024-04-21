import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import BusReservationForm from "./RegistrationForm";

describe("Registration form component", () => {
  const showPopup = true;
  const selectedSeat = 10;
  const value = {
    startDate: "2024-05-01",
    endDate: "2024-05-01",
  };
  const setFormChanges = jest.fn();
  const setReserveButton = jest.fn();
  const resFormChanges = {
    isEmailChanged: false,
    isNameChanged: false,
  };
  const handleReserveClick = jest.fn();
  const setSelectedSeat = jest.fn();
  const setShowPopup = jest.fn();
  const isButtonActive = true;

  afterEach(() => {
    setFormChanges.mockClear();
  });

  it("should render registration form", () => {
    render(
      <BusReservationForm
        showPopup={showPopup}
        selectedSeat={selectedSeat}
        value={value}
      />
    );
    expect(screen.getByTestId("Heading")).toHaveTextContent(
      "Bus Reservation Form"
    );
    expect(screen.getByTestId("seat")).toHaveTextContent("Seat #:10");
    expect(screen.getByTestId("date")).toHaveTextContent("Date #:1 May 2024");
    expect(screen.getByTestId("name")).toHaveTextContent("Name");
    expect(screen.getByTestId("email")).toHaveTextContent("Email");
    expect(screen.getByTestId("cancel")).toHaveTextContent("Cancel");
    expect(screen.getByTestId("reserve")).toHaveTextContent("Reserve Now");
  });
  it("should render name and email required error", () => {
    render(
      <BusReservationForm
        showPopup={showPopup}
        selectedSeat={selectedSeat}
        value={value}
        setFormChanges={setFormChanges}
        resFormChanges={resFormChanges}
      />
    );
    fireEvent.change(screen.getByTestId("nameInput"), {
      target: { value: " " },
    });
    fireEvent.change(screen.getByTestId("emailInput"), {
      target: { value: "test" },
    });
    expect(screen.getByTestId("nameError")).toHaveTextContent(
      "Name is required"
    );
    expect(screen.getByTestId("emailError")).toHaveTextContent(
      "Please enter a valid email"
    );
    expect(setFormChanges).toHaveBeenCalledTimes(2);
    expect(isButtonActive).toBe(true);
  });

  it("should close the registration form on cancel", async () => {
    render(
      <BusReservationForm
        showPopup={showPopup}
        selectedSeat={selectedSeat}
        value={value}
        setFormChanges={setFormChanges}
        setReserveButton={setReserveButton}
        setSelectedSeat={setSelectedSeat}
        setShowPopup={setShowPopup}
      />
    );
    fireEvent.click(screen.getByTestId("cancel"));
    expect(setFormChanges).toHaveBeenCalledTimes(1);
    expect(setReserveButton).toHaveBeenCalledTimes(1);
    expect(setSelectedSeat).toHaveBeenCalledTimes(1);
    expect(setShowPopup).toHaveBeenCalledTimes(1);
    expect(setShowPopup).toHaveBeenCalledWith(false);
  });

  it("should call function to create data", () => {
    render(
      <BusReservationForm
        showPopup={showPopup}
        selectedSeat={selectedSeat}
        value={value}
        handleReserveClick={handleReserveClick}
        setFormChanges={setFormChanges}
        resFormChanges={resFormChanges}
      />
    );
    fireEvent.change(screen.getByTestId("nameInput"), {
      target: { value: "name" },
    });
    fireEvent.change(screen.getByTestId("emailInput"), {
      target: { value: "test@test.com" },
    });
    fireEvent.click(screen.getByTestId("reserve"));
    expect(handleReserveClick).toBeCalledWith("name", "test@test.com");
  });
});
