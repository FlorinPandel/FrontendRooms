// components/RoomList.js
import React from 'react';

function RoomList({ rooms }) {
  return (
    <ul>
      {rooms.map((room) => (
        <li key={room.roomId}>
          <h2>{room.name}</h2>
          <p>Stadt: {room.city}</p>
          <p>Wohnfläche: {room.squareMeters} m²</p>
          <p>Miete: {room.pricePerMonth} €</p>
          <p>Verfügbarkeit: {room.availability}</p>
          <p>Bundesland: {room.state}</p>
          <p>Adresse: {room.address}</p>
        </li>
      ))}
    </ul>
  );
}

export default RoomList;
