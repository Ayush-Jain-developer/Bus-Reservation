import bookingReducer, { bookingActions } from "./bookingSlice";
import { bookingMockData } from "./bookingSlice.mock";

describe("bookingSlice reducer", () => {
  const initialState = { bookings: bookingMockData };

  it("should add booking", () => {
    const action = {
      type: bookingActions.addBooking,
      payload: {
        dateOfBooking: "2024-04-20",
        seatNumber: 11,
        name: "test",
        email: "test@test.com",
      },
    };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookings["2024-04-20"][11].name).toBe("test");
    expect(newState.bookings["2024-04-20"][11].email).toBe("test@test.com");
  });

  it("should delete booking", () => {
    const action = {
      type: bookingActions.deleteBooking,
      payload: {
        dateOfBooking: "2024-04-20",
        seatNumber: 1,
      },
    };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookings["2024-04-20"][1]).toBeUndefined();
  });

  it("should update booking with same date", () => {
    const action = {
      type: bookingActions.updateBooking,
      payload: {
        dateOfBooking: "2024-04-20",
        seatNumber: 2,
        name: "test123",
        email: "test@test123.org",
      },
    };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookings["2024-04-20"][2].name).toBe("test123");
    expect(newState.bookings["2024-04-20"][2].email).toBe("test@test123.org");
  });

  it("should update booking with different date", () => {
    const action = {
      type: bookingActions.updateBooking,
      payload: {
        dateOfBooking: "2024-04-21",
        seatNumber: 2,
        name: "test",
        email: "test@test.org",
        oldDateOfBooking: "2024-04-20",
      },
    };
    const newState = bookingReducer(initialState, action);
    expect(newState.bookings["2024-04-20"][2]).toBeUndefined();
    expect(newState.bookings["2024-04-21"][2].name).toBe("test");
    expect(newState.bookings["2024-04-21"][2].email).toBe("test@test.org");
  });
});
