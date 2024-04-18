import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Navbar = React.lazy(() => import("./components/Navbar"));
const Booking = React.lazy(() => import("./components/Booking"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/seat-booking" element={<Booking />} />
        </Routes>
      </Router>
    </Suspense>
  );
}
