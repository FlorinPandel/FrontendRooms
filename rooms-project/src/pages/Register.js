import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/v1/users/register", formData);
      setMessage(response.data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("Registration error.");
      }
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="relative isolate pt-14">
        {/* Hintergrund oben */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, " +
                "72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, " +
                "27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, " +
                "74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                       w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                       bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20
                       sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Register */}
        <div className="flex min-h-screen items-center justify-center px-6 pt-24 sm:pt-32 lg:pb-40">
          <div className="w-full max-w-md space-y-8 text-center">
            <h2 className="text-5xl font-semibold tracking-tight sm:text-7xl">
              Registrieren
            </h2>
            <p className="mt-4 text-gray-400 text-sm sm:text-base">
              Erstellen Sie ein neues Konto.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-md bg-gray-800/50 p-6 shadow-lg"
            >
              {message && (
                <div className="mb-4 rounded bg-blue-600 p-2 text-white">
                  {message}
                </div>
              )}

              <div className="mb-4 text-left">
                <label className="block text-sm font-medium" htmlFor="username">
                  Benutzername
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300
                             bg-gray-700 p-2 text-white placeholder-gray-400
                             focus:border-indigo-500 focus:outline-none
                             focus:ring-indigo-500"
                  placeholder="Gewünschter Benutzername"
                />
              </div>

              <div className="mb-6 text-left">
                <label className="block text-sm font-medium" htmlFor="password">
                  Passwort
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300
                             bg-gray-700 p-2 text-white placeholder-gray-400
                             focus:border-indigo-500 focus:outline-none
                             focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 py-2 text-sm
                           font-semibold text-white hover:bg-indigo-700
                           focus:outline-none focus:ring-2 focus:ring-indigo-500
                           focus:ring-offset-2"
              >
                Registrieren
              </button>
            </form>
          </div>
          {message && <p>{message}</p>}
        </div>

        {/* Hintergrund unten */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                     transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, " +
                "85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, " +
                "47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, " +
                "27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                       w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr
                       from-[#ff80b5] to-[#9089fc] opacity-20
                       sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
