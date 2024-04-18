import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  bookings: {
    "2024-04-18": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-19": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-20": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-21": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-22": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
    },
    "2024-04-23": {
      1: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      2: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      3: {
        id: nanoid(),
        name: "test",
        email: "test@test.com",
      },
      4: {
        id: nanoid(),
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
