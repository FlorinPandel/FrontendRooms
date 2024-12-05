// components/Filter.js
import React, { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";

function Filter({ filters, setFilters }) {
  const MIN_SIZE = 0;
  const MAX_SIZE = 200; // Maximaler Wert für Wohnfläche in m²

  const MIN_RENT = 0;
  const MAX_RENT = 5000; // Maximaler Wert für Miete in €

  const [sizeRange, setSizeRange] = useState([MIN_SIZE, MAX_SIZE]);
  const [rentRange, setRentRange] = useState([MIN_RENT, MAX_RENT]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters({
      ...filters,
      [id]: value,
    });
  };

  const handleReset = () => {
    setFilters({
      city: "",
      availability: "",
      squareMetersMin: MIN_SIZE,
      squareMetersMax: MAX_SIZE,
      pricePerMonthMin: MIN_RENT,
      pricePerMonthMax: MAX_RENT,
    });
    setSizeRange([MIN_SIZE, MAX_SIZE]);
    setRentRange([MIN_RENT, MAX_RENT]);
  };

  // Aktualisiere die Filter im Elternkomponente, wenn sich die Range-Werte ändern
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      squareMetersMin: sizeRange[0],
      squareMetersMax: sizeRange[1],
      pricePerMonthMin: rentRange[0],
      pricePerMonthMax: rentRange[1],
    }));
  }, [sizeRange, rentRange]);

  return (
    <div className="m-2 max-w-screen-xl">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <h2 className="text-stone-700 text-xl font-bold">Filter anwenden</h2>
        <p className="mt-1 text-sm">
          Verwende Filter, um die Suche zu verfeinern
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Stadt */}
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="text-stone-600 text-sm font-medium"
            >
              Stadt
            </label>
            <input
              type="text"
              id="city"
              placeholder="z.B. Berlin"
              value={filters.city}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          {/* Wohnfläche Range Slider */}
          <div className="flex flex-col col-span-2 gap-x-4">
            <label className="text-stone-600 text-sm font-medium">
              Wohnfläche (m²): {sizeRange[0]} - {sizeRange[1]}
            </label>
            <div className="mt-2">
              <Range
                step={1}
                min={MIN_SIZE}
                max={MAX_SIZE}
                values={sizeRange}
                onChange={(values) => setSizeRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: getTrackBackground({
                        values: sizeRange,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: MIN_SIZE,
                        max: MAX_SIZE,
                      }),
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "16px",
                      width: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#548BF4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        height: "6px",
                        width: "6px",
                        backgroundColor: isDragged ? "#fff" : "#ccc",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Miete Range Slider */}
          <div className="flex flex-col col-span-2 gap-x-4">
            <label className="text-stone-600 text-sm font-medium">
              Miete (€): {rentRange[0]} - {rentRange[1]}
            </label>
            <div className="mt-2">
              <Range
                step={10}
                min={MIN_RENT}
                max={MAX_RENT}
                values={rentRange}
                onChange={(values) => setRentRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      background: getTrackBackground({
                        values: rentRange,
                        colors: ["#ccc", "#548BF4", "#ccc"],
                        min: MIN_RENT,
                        max: MAX_RENT,
                      }),
                      borderRadius: "4px",
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "16px",
                      width: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#548BF4",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 2px 6px #AAA",
                    }}
                  >
                    <div
                      style={{
                        height: "6px",
                        width: "6px",
                        backgroundColor: isDragged ? "#fff" : "#ccc",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Verfügbarkeit */}
          <div className="flex flex-col">
            <label
              htmlFor="availability"
              className="text-stone-600 text-sm font-medium"
            >
              Verfügbarkeit
            </label>

            <select
              id="availability"
              value={filters.availability}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="">Alle</option>
              <option value="Available">Verfügbar</option>
              <option value="Occupied">Belegt</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 hover:opacity-90 focus:outline-none focus:ring active:scale-95"
          >
            Zurücksetzen
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
