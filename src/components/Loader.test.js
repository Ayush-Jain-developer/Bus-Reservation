import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("should render image and text", () => {
    render(<Loader />);
    expect(screen.getByTestId("image")).toBeInTheDocument();
    expect(screen.getByTestId("load")).toBeInTheDocument();
  });
});
