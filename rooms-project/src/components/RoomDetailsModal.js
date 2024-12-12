import React, { useState } from "react";
import ContactForm from "./ContactForm";

export default function RoomDetailsModal({ room, onClose }) {
  const [showContactForm, setShowContactForm] = useState(false);

  // Falls room kein image-Feld hat, nutzen Sie ein Platzhalter-Bild.
  const imageUrl = room.imageUrl || "https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
        <img
          src={imageUrl}
          alt={room.name}
          className="w-full h-64 object-cover rounded-md"
        />

        <h2 className="my-4 text-2xl font-bold">{room.name}</h2>
        <p><strong>Stadt:</strong> {room.city}</p>
        <p><strong>Wohnfläche:</strong> {room.squareMeters} m²</p>
        <p><strong>Miete:</strong> {room.pricePerMonth} €</p>
        <p><strong>Verfügbarkeit:</strong> {room.availability}</p>
        <p><strong>Bundesland:</strong> {room.state}</p>
        <p><strong>Adresse:</strong> {room.address}</p>
        <p><strong>Beschreibung:</strong> {room.description}</p>

        {!showContactForm && (
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setShowContactForm(true)}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Kontakt aufnehmen
            </button>
            <button
              onClick={onClose}
              className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Schließen
            </button>
          </div>
        )}

        {showContactForm && (
          <div className="mt-4">
            <ContactForm room={room} onClose={() => setShowContactForm(false)} />
            <button
              onClick={onClose}
              className="mt-4 inline-block rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Schließen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
