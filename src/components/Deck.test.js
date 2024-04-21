import { fireEvent, render, screen } from "@testing-library/react";
import Deck from "./Deck";

describe("Deck component", () => {
  const handleSeatOnClick = jest.fn();

  const selectedDateData = {
    1: {
      name: "test",
      email: "test@test.com",
    },
    19: {
      name: "test",
      email: "test@test.com",
    },
    20: {
      name: "test",
      email: "test@test.com",
    },
  };

  const selectedSeat = 5;

  const date = "2024-05-01";

  afterEach(() => {
    handleSeatOnClick.mockClear();
  });

  it("should render lower deck", () => {
    render(<Deck />);
    const elements1 = screen.getAllByTestId("seat1");
    const elements2 = screen.getAllByTestId("seat2");
    expect(screen.getByTestId("deck")).toHaveTextContent("Lower Deck");
    expect(screen.getByAltText("Steering Wheel")).toBeInTheDocument();
    expect(elements1.length).toBe(12);
    expect(elements2.length).toBe(6);
    expect(screen.getByTestId("seat3")).toHaveTextContent(19);
    expect(screen.getByTestId("seat4")).toHaveTextContent(20);
  });

  it("should render upper deck", () => {
    render(<Deck isLowerDeck={false} />);
    const elements1 = screen.getAllByTestId("seat1");
    const elements2 = screen.getAllByTestId("seat2");
    expect(screen.getByTestId("deck")).toHaveTextContent("Upper Deck");
    expect(screen.queryByAltText("Steering Wheel")).toBeNull();
    expect(elements1.length).toBe(12);
    expect(elements2.length).toBe(6);
    expect(screen.getByTestId("seat3")).toHaveTextContent(39);
    expect(screen.getByTestId("seat4")).toHaveTextContent(40);
  });

  it("should handle when clicked on lower deck seat", () => {
    render(<Deck handleSeatOnClick={handleSeatOnClick} />);
    fireEvent.click(screen.getByText("19"));
    fireEvent.click(screen.getByText("20"));
    fireEvent.click(screen.getByText("2"));
    expect(handleSeatOnClick).toBeCalledTimes(3);
    expect(handleSeatOnClick).toBeCalledWith(19);
    expect(handleSeatOnClick).toBeCalledWith(20);
    expect(handleSeatOnClick).toBeCalledWith(2);
  });

  it("should handle when clicked on upper deck seat", () => {
    render(<Deck isLowerDeck={false} handleSeatOnClick={handleSeatOnClick} />);
    fireEvent.click(screen.getByText("39"));
    fireEvent.click(screen.getByText("40"));
    fireEvent.click(screen.getByText("24"));
    expect(handleSeatOnClick).toBeCalledTimes(3);
    expect(handleSeatOnClick).toBeCalledWith(39);
    expect(handleSeatOnClick).toBeCalledWith(40);
    expect(handleSeatOnClick).toBeCalledWith(24);
  });

  it("should apply class for reserved seats", () => {
    render(<Deck selectedDateData={selectedDateData} />);
    expect(screen.getByTestId("1")).toHaveClass(
      "bg-gray text-graytext !cursor-not-allowed"
    );
    expect(screen.getByTestId("seat3")).toHaveClass(
      "bg-gray text-graytext !cursor-not-allowed"
    );
    expect(screen.getByTestId("seat4")).toHaveClass(
      "bg-gray text-graytext !cursor-not-allowed"
    );
  });

  it("should apply class for selected seat", () => {
    render(<Deck selectedSeat={selectedSeat} date={date} />);
    expect(screen.getByTestId("5")).toHaveClass("bg-primary text-white");
  });
});
