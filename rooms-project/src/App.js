import logo from "./logo.svg";
import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
function App() {
  const [rooms, setRooms] = useState();

  const getRooms = async () => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:8080/api/v1/rooms`,
        settings
      );
      const data = await fetchResponse.json();
      console.log(data);
      setRooms(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
}

export default App;
