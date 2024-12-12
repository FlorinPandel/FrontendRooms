import React, { useState } from "react";

function ContactForm({ room, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Kontaktformular abgeschickt:", formData, "Bezüglich:", room);
    onClose();
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="mb-2 text-lg font-semibold">Kontaktformular</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block font-medium" htmlFor="name">
            Name:
          </label>
          <input
            className="mt-1 w-full rounded border border-gray-300 p-2"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium" htmlFor="email">
            E-Mail:
          </label>
          <input
            className="mt-1 w-full rounded border border-gray-300 p-2"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium" htmlFor="message">
            Nachricht:
          </label>
          <textarea
            className="mt-1 w-full rounded border border-gray-300 p-2"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Absenden
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
