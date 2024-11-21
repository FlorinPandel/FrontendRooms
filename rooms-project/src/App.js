import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import RoomList from "./components/RoomList";
import Navigation from "./components/Navigation";

function App() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("");

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
      <Navigation />
      <div class="m-2 max-w-screen-md">
        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 class="text-stone-700 text-xl font-bold">Apply filters</h2>
          <p class="mt-1 text-sm">Use filters to further refine search</p>
          <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div class="flex flex-col">
              <label for="name" class="text-stone-600 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="raspberry juice"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label
                for="manufacturer"
                class="text-stone-600 text-sm font-medium"
              >
                Manufacturer
              </label>
              <input
                type="manufacturer"
                id="manufacturer"
                placeholder="cadbery"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label for="date" class="text-stone-600 text-sm font-medium">
                Date of Entry
              </label>
              <input
                type="date"
                id="date"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>

            <div class="flex flex-col">
              <label for="status" class="text-stone-600 text-sm font-medium">
                Status
              </label>

              <select
                id="status"
                class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Dispached Out</option>
                <option>In Warehouse</option>
                <option>Being Brought In</option>
              </select>
            </div>
          </div>

          <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
            <button class="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">
              Reset
            </button>
            <button class="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">
              Search
            </button>
          </div>
        </div>
      </div>

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
