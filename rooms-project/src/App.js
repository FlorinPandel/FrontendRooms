import "./App.css";
import api from "./api/axiosConfig";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import RoomList from "./components/RoomList";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const MIN_SIZE = 0;
  const MAX_SIZE = 200;
  const MIN_RENT = 0;
  const MAX_RENT = 5000;

  // States for rooms and filters
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    squareMetersMin: MIN_SIZE,
    squareMetersMax: MAX_SIZE,
    pricePerMonthMin: MIN_RENT,
    pricePerMonthMax: MAX_RENT,
    availability: "",
  });
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Fetch rooms from API
  const getRooms = async () => {
    try {
      const response = await api.get("/api/v1/rooms");
      setRooms(response.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);


  // Update filteredRooms when filters or rooms change
  useEffect(() => {
    const filtered = rooms.filter((room) => {
      const cityMatch =
        !filters.city ||
        room.city.toLowerCase().includes(filters.city.toLowerCase());
      const sizeMatch =
        room.squareMeters >= filters.squareMetersMin &&
        room.squareMeters <= filters.squareMetersMax;
      const rentMatch =
        room.pricePerMonth >= filters.pricePerMonthMin &&
        room.pricePerMonth <= filters.pricePerMonthMax;
      const availMatch =
        !filters.availability || room.availability === filters.availability;

      return cityMatch && sizeMatch && rentMatch && availMatch;
    });
    setFilteredRooms(filtered);
  }, [filters, rooms]);

  function HomePage() {
    return (
      <>
        <header className="App-header">
          <h1></h1>
        </header>
        {filteredRooms.length > 0 ? (
          <RoomList rooms={filteredRooms} />
        ) : (
          <p>Keine Zimmer verfügbar.</p>
        )}
      </>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Navigation filters={filters} setFilters={setFilters} />

        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
