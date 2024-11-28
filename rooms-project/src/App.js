// App.js
import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import RoomList from "./components/RoomList";
import Navigation from "./components/Navigation";

function App() {
  const MIN_SIZE = 0;
  const MAX_SIZE = 200; // Maximaler Wert für Wohnfläche

  const MIN_RENT = 0;
  const MAX_RENT = 5000; // Maximaler Wert für Miete

  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    squareMetersMin: MIN_SIZE,
    squareMetersMax: MAX_SIZE,
    pricePerMonthMin: MIN_RENT,
    pricePerMonthMax: MAX_RENT,
    availability: "",
  });

  const getRooms = async () => {
    try {
      const response = await api.get("/api/v1/rooms");
      console.log(response.data);
      setRooms(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  // Filtere die Räume basierend auf den Filtern
  const filteredRooms = rooms.filter((room) => {
    // Filter nach Stadt
    const cityMatch =
      filters.city === "" ||
      room.city.toLowerCase().includes(filters.city.toLowerCase());

    // Filter nach Wohnfläche
    const sizeMatch =
      room.squareMeters >= filters.squareMetersMin &&
      room.squareMeters <= filters.squareMetersMax;

    // Filter nach Miete
    const rentMatch =
      room.pricePerMonth >= filters.pricePerMonthMin &&
      room.pricePerMonth <= filters.pricePerMonthMax;

    // Filter nach Verfügbarkeit
    const availabilityMatch =
      filters.availability === "" || room.availability === filters.availability;

    return cityMatch && sizeMatch && rentMatch && availabilityMatch;
  });

  return (
    <div className="App">
      <Navigation />

      {/* Filter-Komponente einbinden */}
      <Filter filters={filters} setFilters={setFilters} />

      <header className="App-header">
        <h1>WG-Zimmerbörse</h1>
      </header>

      {filteredRooms && filteredRooms.length > 0 ? (
        <RoomList rooms={filteredRooms} />
      ) : (
        <p>Keine Zimmer verfügbar.</p>
      )}
    </div>
  );
}

export default App;
