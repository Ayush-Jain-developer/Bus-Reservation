import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar component", () => {
  it("should render app name", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByTestId("Bus")).toHaveTextContent("BUS.");
  });

  it("should render drop down button", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByTestId("Dropdown button")).toBeInTheDocument();
  });
});
