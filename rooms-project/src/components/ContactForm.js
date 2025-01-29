import React, { useState } from "react";
import axios from "axios";
import api from "../api/axiosConfig";

function ContactForm({ room, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!room || !room.roomId) {
      setFeedbackMessage("Kein gültiges Zimmer ausgewählt.");
      return;
    }

    const payload = {
      roomId: room.roomId,
      senderName: formData.name,
      senderEmail: formData.email,
      content: formData.message,
    };

    try {
      setIsSending(true);
      setFeedbackMessage("");

      const response = await api.post("/api/v1/messages", payload);
      setFeedbackMessage("Nachricht erfolgreich gesendet!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.response && error.response.data) {
        setFeedbackMessage(`Fehler: ${error.response.data}`);
      } else {
        setFeedbackMessage("Es ist ein Fehler aufgetreten.");
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="mb-2 text-lg font-semibold">Kontaktformular</h3>

      {feedbackMessage && (
        <div className="mb-2 rounded border border-blue-200 bg-blue-50 p-2 text-blue-800">
          {feedbackMessage}
        </div>
      )}

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
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            type="submit"
            disabled={isSending}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-blue-300"
          >
            {isSending ? "Wird gesendet..." : "Absenden"}
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
