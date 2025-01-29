import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axiosConfig";

export default function Dashboard() {
  const { user } = useAuth() || {};

  if (!user?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const [roomData, setRoomData] = useState({
    name: "",
    city: "",
    state: "",
    address: "",
    squareMeters: 0,
    pricePerMonth: 0,
    description: "",
  });

  const [messages, setMessages] = useState([]);

  // Postfach laden
  useEffect(() => {
    if (user?.username) {
      fetchMessages(user.username);
    }
  }, [user]);

  const fetchMessages = async (username) => {
    console.log("Fetching inbox for username:", username);
    try {
      const encodedUsername = encodeURIComponent(username);
      const response = await api.get(`/api/v1/users/inbox?username=${encodedUsername}`);
      console.log("Inbox response:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Fehler beim Laden des Postfachs:", error);
    }
  };

  const handleRoomChange = (e) => {
    setRoomData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Neues Zimmer erstellen
  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/v1/rooms/create?username=${user?.username}`, roomData);
      alert("Zimmer erfolgreich eingestellt!");

      setRoomData({
        name: "",
        city: "",
        state: "",
        address: "",
        squareMeters: 0,
        pricePerMonth: 0,
        description: "",
      });
    } catch (error) {
      console.error("Fehler beim Erstellen des Zimmers:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="relative isolate pt-14">
        {/* Hintergrund (oben) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, " +
                "80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, " +
                "45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, " +
                "76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] 
                       w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-20 sm:left-[calc(50%-30rem)]
                       sm:w-[72.1875rem]"
          />
        </div>

        {/* Dashboard-Inhalt */}
        <div className="flex flex-col items-center justify-center px-6 pt-24 sm:pt-32 lg:pb-40">
          <div className="w-full max-w-3xl text-center mb-8">
            <h2 className="text-5xl font-semibold sm:text-7xl">Dashboard</h2>
            <p className="mt-4 text-gray-400 text-sm sm:text-base">
              Willkommen, {user?.username || "Unbekannter Nutzer"}!
            </p>
          </div>

          <div className="w-full max-w-3xl space-y-8">
            {/* Neues Zimmer einstellen */}
            <section className="rounded-md bg-gray-800/50 p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Neues Zimmer einstellen</h3>
              <form onSubmit={handleRoomSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Zimmername</label>
                  <input
                    type="text"
                    name="name"
                    value={roomData.name}
                    onChange={handleRoomChange}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Stadt</label>
                  <input
                    type="text"
                    name="city"
                    value={roomData.city}
                    onChange={handleRoomChange}
                    required
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Bundesland</label>
                  <input
                    type="text"
                    name="state"
                    value={roomData.state}
                    onChange={handleRoomChange}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Adresse</label>
                  <input
                    type="text"
                    name="address"
                    value={roomData.address}
                    onChange={handleRoomChange}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Wohnfläche (m²)</label>
                  <input
                    type="number"
                    name="squareMeters"
                    value={roomData.squareMeters}
                    onChange={handleRoomChange}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Preis/Monat (€)</label>
                  <input
                    type="number"
                    name="pricePerMonth"
                    value={roomData.pricePerMonth}
                    onChange={handleRoomChange}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Beschreibung</label>
                  <input
                    type="text"
                    name="description"
                    value={roomData.description}
                    onChange={handleRoomChange}
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-700 
                               p-2 text-white placeholder-gray-400 focus:border-indigo-500 
                               focus:outline-none focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm
                             font-semibold text-white hover:bg-indigo-700
                             focus:outline-none focus:ring-2 focus:ring-indigo-500
                             focus:ring-offset-2"
                >
                  Zimmer erstellen
                </button>
              </form>
            </section>

            {/* Postfach */}
            <section className="rounded-md bg-gray-800/50 p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Postfach</h3>
              {messages.length === 0 ? (
                <p className="text-gray-300">Keine Nachrichten vorhanden</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className="rounded border border-gray-600 bg-gray-700 p-3"
                    >
                      <p className="text-sm text-gray-200 mb-1">
                        <strong>Absender:</strong> {msg.senderName} ({msg.senderEmail})
                      </p>
                      <p className="text-sm text-gray-200 mb-1">
                        <strong>Bezug auf Zimmer:</strong> {msg.relatedRoomId}
                      </p>
                      <p className="text-sm text-gray-200">{msg.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Hintergrund (unten) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                     transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, " +
                "85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, " +
                "52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, " +
                "0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem]
                       -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                       opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
