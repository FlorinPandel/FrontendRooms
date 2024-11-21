import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Filter from './components/Filter';
import RoomList from './components/RoomList';

function App() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState('');

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

  // Filtere die Räume basierend auf dem Bundesland
  const filteredRooms = rooms.filter((room) =>
    room.state.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>WG-Zimmerbörse</h1>
      </header>
      <Filter filter={filter} setFilter={setFilter} />
      {filteredRooms && filteredRooms.length > 0 ? (
        <RoomList rooms={filteredRooms} />
      ) : (
        <p>Keine Zimmer verfügbar.</p>
      )}
    </div>
  );
}

export default App;
