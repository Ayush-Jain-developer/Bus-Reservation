import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bookings: {
    "2024-05-01": {
      1: {
        id: 1,
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: 2,
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: 3,
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: 4,
        name: "test",
        email: "test@test.com",
      },
      5: {
        id: 5,
        name: "test",
        email: "test@test.com",
      },
    },
  },
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const { dateOfBooking, seatNumber, name, email } = action.payload;
      state.bookings[dateOfBooking] = {
        ...state.bookings[dateOfBooking],
        [seatNumber]: {
          id: nanoid(),
          name,
          email,
        },
      };
    },
    deleteBooking: (state, action) => {
      const { dateOfBooking, seatNumber } = action.payload;
      delete state.bookings[dateOfBooking][seatNumber];
      if (Object.keys(state.bookings[dateOfBooking]).length === 0)
        delete state.bookings[dateOfBooking];
    },
    updateBooking: (state, action) => {
      const { dateOfBooking, seatNumber, name, email } = action.payload;
      if (action.payload.oldDateOfBooking) {
        delete state.bookings[action.payload.oldDateOfBooking][seatNumber];
        if (
          Object.keys(state.bookings[action.payload.oldDateOfBooking])
            .length === 0
        )
          delete state.bookings[action.payload.oldDateOfBooking];
        state.bookings[dateOfBooking] = {
          ...state.bookings[dateOfBooking],
          [seatNumber]: {
            id: nanoid(),
            name,
            email,
          },
        };
      } else {
        state.bookings[dateOfBooking][seatNumber] = {
          id: nanoid(),
          name,
          email,
        };
      }
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
