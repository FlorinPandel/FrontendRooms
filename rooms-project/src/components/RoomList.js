// components/RoomList.js
import React from "react";
import Card from "./Card";
function RoomList({ rooms }) {
  return (
    <ul>
      <div class="grid grid-cols-3">
        {rooms.map((room) => (
          <li key={room.roomId}>
            <Card name={room.name} price={room.pricePerMonth} />
          </li>
        ))}
      </div>
    </ul>
  );
}

export default RoomList;
