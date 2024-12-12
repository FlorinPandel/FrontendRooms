import React, { useState } from "react";
import Card from "./Card";
import RoomDetailsModal from "./RoomDetailsModal";

function RoomList({ rooms }) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div>
      <ul>
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => (
            <li key={room.roomId}>
              <Card
                name={room.name}
                price={room.pricePerMonth}
                onDetailsClick={() => setSelectedRoom(room)}
              />
            </li>
          ))}
        </div>
      </ul>

      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}

export default RoomList;
