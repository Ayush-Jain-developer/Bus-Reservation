import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dropdown from "./Dropdown";

describe("Dropdown component", () => {
  const navItems = [
    {
      name: "Dashboard",
      route: "/",
    },
    {
      name: "Booking",
      route: "/seat-booking",
    },
  ];

  it("renders dashboard initially", () => {
    render(
      <MemoryRouter>
        <Dropdown navItems={navItems} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("Dashboard")).toHaveTextContent("Dashboard");
  });

  it("should show dropdown on click", async () => {
    render(
      <MemoryRouter>
        <Dropdown navItems={navItems} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("Dropdown button"));
    expect(screen.getByTestId("Dropdown item: Dashboard")).toHaveTextContent(
      "Dashboard"
    );
    expect(screen.getByTestId("Dropdown item: Booking")).toHaveTextContent(
      "Booking"
    );
  });

  it("should select the options from drop down list", () => {
    render(
      <MemoryRouter>
        <Dropdown navItems={navItems} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId("Dropdown button"));
    fireEvent.click(screen.getByTestId("Dropdown item: Booking"));
    expect(screen.getByTestId("Booking")).toHaveTextContent("Booking");
  });
});
