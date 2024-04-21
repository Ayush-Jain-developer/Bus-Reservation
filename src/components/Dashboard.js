import { useDispatch, useSelector } from "react-redux";
import { MdEdit, MdDelete } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { bookingActions } from "../redux/slices/bookingSlice";

function Dashboard() {
  const bookingsAllData = useSelector((state) => state.bookings.bookings);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const dashboardData = Object.entries(bookingsAllData).flatMap(
    ([dateOfBooking, seats]) => {
      return Object.entries(seats).map(([seatNumber, data]) => {
        return {
          dateOfBooking,
          seatNumber,
          ...data,
        };
      });
    }
  );
  const paginationData = dashboardData.filter((item, i) => {
    return (
      i >= (pagination.pageNumber - 1) * pagination.pageSize &&
      i < pagination.pageNumber * pagination.pageSize
    );
  });
  const totalPages = Math.ceil(dashboardData.length / 10) || 1;
  const pagesArr = Array.from({ length: totalPages }, (_, i) => {
    return i + 1;
  });
  const references = {
    nameRef: useRef(),
    emailRef: useRef(),
    dateRef: useRef(),
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState({
    dashboardEmailError: false,
    dateError: false,
    nameError: false,
  });
  const [removeBooking, setRemoveBooking] = useState(false);
  const [selectedBookingID, setSelectedBookingID] = useState(null);
  const dispatch = useDispatch();
  const { deleteBooking, updateBooking } = bookingActions;
  const handleDeleteButton = (id) => {
    setSelectedBookingID(id);
    setRemoveBooking(true);
  };
  const handleConfirmDelete = () => {
    const currentPage = pagination.pageNumber;
    if (paginationData.length % 10 === 1)
      setPagination({
        pageNumber: currentPage - 1,
        pageSize: 10,
      });
    const { dateOfBooking, seatNumber } = dashboardData.find(
      (item) => item.id === selectedBookingID
    );
    dispatch(
      deleteBooking({
        dateOfBooking,
        seatNumber,
      })
    );
    toast.success("Booking deleted successfully");
  };
  const handleEditButton = (id) => {
    setEditable(true);
    setSelectedBookingID(id);
  };
  const handleCancelEdit = () => {
    setError({
      ...error,
      dashboardEmailError: false,
    });
    setError({
      ...error,
      nameError: false,
    });
    setError({
      ...error,
      dateError: false,
    });
    setEditable(false);
  };
  const handleEmailChange = (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = !regex.test(e.target.value);
    setError({
      ...error,
      dashboardEmailError: emailError ? true : false,
    });
  };
  const handleDateChange = (e, id) => {
    const { dateOfBooking, seatNumber } = dashboardData.find(
      (item) => item.id === id
    );
    const newDateOfBooking = e.target.value;
    let seatBooked =
      dateOfBooking !== newDateOfBooking
        ? bookingsAllData[newDateOfBooking]?.[seatNumber]
        : null;
    setError({
      ...error,
      dateError: seatBooked ? true : false,
    });
  };
  const handleConfirmButton = (id) => {
    if (!references.nameRef.current.value.trim()) {
      return setError({
        ...error,
        nameError: true,
      });
    }
    setError({
      ...error,
      nameError: false,
    });
    const { dateOfBooking, seatNumber } = dashboardData.find(
      (item) => item.id === id
    );
    const newDateOfBooking = references.dateRef.current.value;
    const updatedData =
      dateOfBooking !== newDateOfBooking
        ? {
            dateOfBooking: newDateOfBooking,
            seatNumber,
            name: references.nameRef.current.value,
            email: references.emailRef.current.value,
            oldDateOfBooking: dateOfBooking,
          }
        : {
            dateOfBooking,
            seatNumber,
            name: references.nameRef.current.value,
            email: references.emailRef.current.value,
          };
    dispatch(updateBooking(updatedData));
  };

  useEffect(() => {
    setRemoveBooking(false);
    setEditable(false);
  }, [bookingsAllData]);

  const handlePageChange = (pageNumber) => {
    setPagination({
      pageNumber,
      pageSize: 10,
    });
  };

  const handlePreviousPage = () => {
    const currentPage = pagination.pageNumber;
    if (currentPage === 1) return;
    setPagination({
      pageNumber: currentPage - 1,
      pageSize: 10,
    });
  };

  const handleNextPage = () => {
    const currentPage = pagination.pageNumber;
    if (currentPage === totalPages) return;
    setPagination({
      pageNumber: currentPage + 1,
      pageSize: 10,
    });
  };
  return (
    <>
      <div className="flex justify-center mt-28">
        <table className="table-auto border-collapse">
          <thead className="bg-primary">
            <tr className="text-white">
              <th className="px-4 py-2" data-testid={"name"}>
                Name
              </th>
              <th className="px-4 py-2" data-testid={"email"}>
                Email
              </th>
              <th className="px-4 py-2" data-testid={"date"}>
                Date of Booking
              </th>
              <th className="px-4 py-2" data-testid={"seat"}>
                Seat Number
              </th>
              <th className="px-4 py-2" data-testid={"actions"}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginationData.map((item, i) => {
              return (
                <tr key={item.id} data-testid={"row"}>
                  <td className="px-4 py-2">
                    {editable && selectedBookingID === item.id ? (
                      <input
                        data-testid={`nameEdit`}
                        ref={references.nameRef}
                        type="text"
                        defaultValue={item.name}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                      />
                    ) : (
                      item.name
                    )}
                    {error.nameError && selectedBookingID === item.id && (
                      <p className="text-error" data-testid={"nameError"}>
                        Name is required
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2" onChange={handleEmailChange}>
                    {editable && selectedBookingID === item.id ? (
                      <input
                        data-testid={`emailEdit`}
                        ref={references.emailRef}
                        type="email"
                        defaultValue={item.email}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                      />
                    ) : (
                      item.email
                    )}
                    {error.dashboardEmailError &&
                      selectedBookingID === item.id && (
                        <p className="text-error" data-testid={"emailError"}>
                          Please enter a valid email
                        </p>
                      )}
                  </td>
                  <td
                    className="px-8 py-2"
                    onChange={(e) => handleDateChange(e, item.id)}
                  >
                    {editable && selectedBookingID === item.id ? (
                      <input
                        data-testid={`dateEdit`}
                        ref={references.dateRef}
                        type="date"
                        min={minDate}
                        defaultValue={item.dateOfBooking}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                      />
                    ) : (
                      item.dateOfBooking
                    )}
                    {error.dateError && selectedBookingID === item.id && (
                      <p className="text-error" data-testid={"dateError"}>
                        Seat already booked for the selected date
                      </p>
                    )}
                  </td>
                  <td className="px-14 py-2">{item.seatNumber}</td>
                  <td className="py-2 flex justify-evenly">
                    {editable && selectedBookingID === item.id ? (
                      <>
                        <ImCancelCircle
                          className="cursor-pointer"
                          onClick={handleCancelEdit}
                          data-testid={"cancelEdit"}
                        />
                        <FaCheck
                          className={`cursor-pointer ${
                            error.dateError || error.dashboardEmailError
                              ? "opacity-50 pointer-events-none cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleConfirmButton(item.id)}
                          data-testid={"confirmEdit"}
                        />
                      </>
                    ) : (
                      <>
                        <MdEdit
                          className="cursor-pointer"
                          onClick={() => handleEditButton(item.id)}
                          data-testid={`edit ${i + 1}`}
                        />
                        <MdDelete
                          className="cursor-pointer"
                          onClick={() => handleDeleteButton(item.id)}
                          data-testid={`delete ${i + 1}`}
                        />
                      </>
                    )}
                    {removeBooking && selectedBookingID === item.id && (
                      <div className="fixed inset-0 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black opacity-50"></div>

                        <div className="relative bg-white p-8 rounded shadow-lg">
                          <h2
                            className="text-lg font-semibold mb-4"
                            data-testid={"sure"}
                          >
                            Are you sure you want to delete?
                          </h2>
                          <div className="flex justify-center">
                            <button
                              className="px-4 py-2 mr-2 bg-red-500 text-error rounded hover:bg-red-600"
                              onClick={handleConfirmDelete}
                              data-testid={`confirmDelete`}
                            >
                              Delete
                            </button>

                            <button
                              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                              onClick={() => setRemoveBooking(false)}
                              data-testid={"cancel"}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-6">
        <p
          className={`mr-6 ${pagination.pageNumber !== 1 && "cursor-pointer"}`}
          onClick={handlePreviousPage}
          data-testid={"back"}
        >
          {"<"}
        </p>
        {pagesArr.map((page) => {
          return (
            <p
              key={page}
              className={`mr-6 cursor-pointer ${
                pagination.pageNumber === page && "text-primary"
              }`}
              onClick={() => handlePageChange(page)}
              data-testid={"page"}
            >
              {page}
            </p>
          );
        })}
        <p
          className={`${
            pagination.pageNumber !== totalPages && "cursor-pointer"
          }`}
          onClick={handleNextPage}
          data-testid={"forward"}
        >
          {">"}
        </p>
      </div>
    </>
  );
}

export default Dashboard;
