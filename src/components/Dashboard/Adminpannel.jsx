import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useApi } from "../../Context/baseUrl";

export default function AdminPanel() {
  const API = useApi();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      setLoginError("");
      loadEvents();
    } else {
      setLoginError("❌ Wrong username or password");
    }
  };

  const loadEvents = () => {
    setLoading(true);
    fetch(`${API}/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  };

  const deleteEvent = (id, eventName) => {
    if (
      window.confirm(
        `🗑️ Are you sure you want to delete "${eventName}"? This action cannot be undone.`
      )
    ) {
      fetch(`${API}/events/${id}`, { method: "DELETE" }).then(() =>
        loadEvents()
      );
    }
  };

  const addEvent = (e) => {
    e.preventDefault();
    if (!name || !date || !description) return;

    fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, description }),
    }).then(() => {
      setName("");
      setDate("");
      setDescription("");
      loadEvents();
    });
  };

  if (!isLoggedIn)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#01abfd] via-[#c084fc] to-[#60a5fa] relative py-8 px-4 flex justify-center items-center">
        <div className="absolute inset-0 z-0">
          {/* subtle pattern or vector lights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.03)_75%,rgba(255,255,255,0.03))] bg-[length:40px_40px]"></div>
        </div>
        <Navigation />
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-gray-800 space-y-4 z-10"
        >
          <h2 className="text-3xl mb-4 font-bold text-center text-indigo-700">
            🔐 Admin Login
          </h2>

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-indigo-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError && (
            <p className="text-red-500 text-sm text-center">{loginError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-white rounded-full py-3 text-lg font-semibold hover:scale-105 shadow transition-all"
          >
            Login
          </button>
        </form>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01abfd] via-[#c084fc] to-[#60a5fa] relative py-8 px-4">
      <div className="absolute inset-0 z-0">
        {/* subtle pattern or vector lights */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.03)_75%,rgba(255,255,255,0.03))] bg-[length:40px_40px]"></div>
      </div>
      <Navigation />
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700 mt-20">
        📜 Festival Admin Panel
      </h1>

      <form
        onSubmit={addEvent}
        className="bg-white rounded-xl p-6 mb-8 shadow-lg max-w-2xl mx-auto space-y-4"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 ">
          Add New Event
        </h2>
        <input
          type="text"
          placeholder="Event Name"
          className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-indigo-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="w-full p-3 rounded-md bg-gray-100 focus:ring-2 focus:ring-indigo-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 text-white py-3 rounded-full font-semibold hover:scale-105 shadow transition-all"
        >
          ➕ Add Event
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
        Existing Events
      </h2>
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event._id}
                className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <p className="font-bold text-lg text-indigo-700">
                    {event.name}
                  </p>
                  <p className="text-gray-600">
                    {new Date(event.date).toDateString()}
                  </p>
                  <p className="text-gray-500">{event.description}</p>
                </div>
                <button
                  onClick={() => deleteEvent(event._id, event.name)}
                  className="text-red-500 hover:text-red-600 font-bold text-xl"
                  title="Delete Event"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
