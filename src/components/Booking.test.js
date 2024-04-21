/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../redux/store";
import Booking from "./Booking";
import { Provider } from "react-redux";

describe("Booking component", () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Booking />
      </Provider>
    );
  };

  it("should render booking component", () => {
    renderComponent();
    expect(screen.getByTestId("dateSelect")).toBeInTheDocument();
    expect(screen.getByTestId("date")).toBeInTheDocument();
    expect(screen.queryByTestId("Heading")).not.toBeInTheDocument();
    expect(screen.getByTestId("click")).toBeInTheDocument();
    expect(screen.getByTestId("Deck")).toBeInTheDocument();
  });

  it("should not allow seat selection without date", () => {
    renderComponent();
    expect(screen.getByTestId("Deck")).toHaveClass(
      "opacity-50 pointer-events-none cursor-not-allowed"
    );
  });

  it("should select a date", () => {
    renderComponent();
    const input = screen.getByTestId("date").querySelector("input");
    fireEvent.change(input, {
      target: { value: "2024-05-01" },
    });
    expect(input.value).toBe("2024-05-01");
    expect(screen.getByTestId("Deck")).not.toHaveClass(
      "opacity-50 pointer-events-none cursor-not-allowed"
    );
  });

  it("should select a seat", () => {
    renderComponent();
    const input = screen.getByTestId("date").querySelector("input");
    fireEvent.change(input, {
      target: { value: "2024-05-01" },
    });
    const seat = screen
      .getByTestId("Deck")
      .querySelector(".hover\\:text-white");
    fireEvent.click(seat);
    expect(seat).toHaveClass("bg-primary text-white");
  });

  it("should reserve a seat", () => {
    renderComponent();
    const input = screen.getByTestId("date").querySelector("input");
    fireEvent.change(input, {
      target: { value: "2024-05-01" },
    });
    const seat = screen
      .getByTestId("Deck")
      .querySelector(".hover\\:text-white");
    fireEvent.click(seat);
    expect(screen.getByTestId("Heading")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("nameInput"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByTestId("emailInput"), {
      target: { value: "test@test.com" },
    });
    fireEvent.click(screen.getByTestId("reserve"));
    expect(screen.queryByTestId("Heading")).not.toBeInTheDocument();
  });
});
