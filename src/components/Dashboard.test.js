import { fireEvent, render, screen } from "@testing-library/react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import Dashboard from "./Dashboard";

describe("Dashboard component", () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
  };
  it("should render dashboard component", () => {
    renderComponent();
    const rowElements = screen.getAllByTestId("row");
    const pageElements = screen.getAllByTestId("page");
    expect(screen.getByTestId("name")).toHaveTextContent("Name");
    expect(screen.getByTestId("email")).toHaveTextContent("Email");
    expect(screen.getByTestId("date")).toHaveTextContent("Date of Booking");
    expect(screen.getByTestId("seat")).toHaveTextContent("Seat Number");
    expect(screen.getByTestId("actions")).toHaveTextContent("Actions");
    expect(rowElements.length).toBe(5);
    expect(pageElements.length).toBe(1);
    expect(screen.getByTestId("back")).toBeInTheDocument();
    expect(screen.getByTestId("forward")).toBeInTheDocument();
  });

  it("should delete a booking", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("delete 1"));
    expect(screen.getByTestId("sure")).toBeInTheDocument();
    expect(screen.getByTestId("confirmDelete")).toBeInTheDocument();
    expect(screen.getByTestId("cancel")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("confirmDelete"));
    const rowElements = screen.getAllByTestId("row");
    expect(rowElements.length).toBe(4);
  });

  it("cancel delete", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("delete 1"));
    fireEvent.click(screen.getByTestId("cancel"));
    expect(screen.queryByTestId("sure")).not.toBeInTheDocument();
    expect(screen.queryByTestId("confirmDelete")).not.toBeInTheDocument();
    expect(screen.queryByTestId("cancel")).not.toBeInTheDocument();
  });

  it("should allow editing", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("edit 1"));
    expect(screen.getByTestId("nameEdit")).toBeInTheDocument();
    expect(screen.getByTestId("emailEdit")).toBeInTheDocument();
    expect(screen.getByTestId("dateEdit")).toBeInTheDocument();
    expect(screen.getByTestId("cancelEdit")).toBeInTheDocument();
    expect(screen.getByTestId("confirmEdit")).toBeInTheDocument();
  });

  it("should show error for name and email", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("edit 1"));
    fireEvent.change(screen.getByTestId("nameEdit"), {
      target: { value: " " },
    });
    fireEvent.click(screen.getByTestId("confirmEdit"));
    expect(screen.getByTestId("nameError")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("emailEdit"), {
      target: { value: "test" },
    });
    expect(screen.getByTestId("emailError")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("dateEdit"), {
      target: { value: "20" },
    });
  });

  it("should edit booking", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("edit 1"));
    fireEvent.change(screen.getByTestId("nameEdit"), {
      target: { value: "test1" },
    });
    fireEvent.change(screen.getByTestId("emailEdit"), {
      target: { value: "test@test123.com" },
    });
    fireEvent.change(screen.getByTestId("dateEdit"), {
      target: { value: "2024-05-02" },
    });
    fireEvent.click(screen.getByTestId("confirmEdit"));
    expect(screen.queryByTestId("dateError")).not.toBeInTheDocument();
    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test@test123.com")).toBeInTheDocument();
    expect(screen.getByText("2024-05-02")).toBeInTheDocument();
  });
});
