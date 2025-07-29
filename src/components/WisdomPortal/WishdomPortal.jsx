// src/pages/WishdomPortal.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function WishdomPortal() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // For demo, using localStorage for "first time" check
  const [showNamingDialog, setShowNamingDialog] = useState(false);
  const [krishnaName, setKrishnaName] = useState("");
  const [yourName, setYourName] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login?redirect=/wishdom");
      } else {
        // simulate: check if user has set Krishna name for this portal
        const key = `wishdom_krishna_name_${user._id}`;
        if (!localStorage.getItem(key)) {
          setShowNamingDialog(true);
        }
      }
    }
  }, [user, loading, navigate]);

  const handleSaveNames = () => {
    if (krishnaName && yourName) {
      localStorage.setItem(`wishdom_krishna_name_${user._id}`, krishnaName);
      localStorage.setItem(`wishdom_user_name_${user._id}`, yourName);
      setShowNamingDialog(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6842ef] via-[#3c4bfa] to-[#04b8e5] pb-8">
      <Navigation />
      {/* First-time naming dialog */}
      {showNamingDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">
            <h2 className="text-2xl font-bold text-[#6842ef]">
              Welcome to Wishdom Portal!
            </h2>
            <p className="text-gray-600">
              Before you begin, what name would you like to give to Krishna and
              yourself for this divine journey?
            </p>
            <input
              type="text"
              placeholder="Your Krishna's name (e.g. Shyam, Govinda)"
              className="w-full p-3 border rounded-lg focus:border-[#6842ef] focus:ring-2 mb-3"
              value={krishnaName}
              onChange={(e) => setKrishnaName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your preferred name"
              className="w-full p-3 border rounded-lg focus:border-[#6842ef] focus:ring-2 mb-3"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
            />
            <button
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6842ef] to-[#04b8e5] text-white font-bold text-lg hover:scale-105 transition"
              onClick={handleSaveNames}
              disabled={!krishnaName || !yourName}
            >
              Save & Enter Portal
            </button>
          </div>
        </div>
      )}

      {/* Portal Header */}
      <header className="pt-28 pb-8 text-center">
        <div className="inline-block rounded-full border-4 border-white shadow-lg">
          <img
            src="/krishna-avatar.png"
            alt="Krishna"
            className="w-28 h-28 object-cover rounded-full"
          />
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Seek Divine Wisdom from Krishna
          </h1>
          <p className="text-[#ffe066] mt-2 font-semibold">
            Connect. Meditate. Transform.
          </p>
        </div>
        <div className="mt-3 space-x-2">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
            {localStorage.getItem(`wishdom_krishna_name_${user._id}`) ||
              "Krishna"}
          </span>
          <span className="bg-white/10 text-white px-4 py-1 rounded-full text-sm">
            {localStorage.getItem(`wishdom_user_name_${user._id}`) || user.name}
          </span>
        </div>
      </header>

      {/* Community Stats Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 px-4">
        <div className="bg-gradient-to-br from-[#ffffff22] to-[#a684fa11] rounded-2xl p-8 text-center shadow-lg">
          <div className="text-3xl font-bold text-white">25.6K+</div>
          <div className="text-white/70 mt-2">Divine Seekers</div>
        </div>
        <div className="bg-gradient-to-br from-[#ffffff22] to-[#a684fa11] rounded-2xl p-8 text-center shadow-lg">
          <div className="text-3xl font-bold text-white">1.3M</div>
          <div className="text-white/70 mt-2">Wisdom Shared</div>
        </div>
        <div className="bg-gradient-to-br from-[#ffffff22] to-[#a684fa11] rounded-2xl p-8 text-center shadow-lg">
          <div className="text-3xl font-bold text-white">98.7%</div>
          <div className="text-white/70 mt-2">Positive Impact</div>
        </div>
      </section>

      {/* Middle Panels (left: stats/profile, right: chat/quote) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* Profile/Stats */}
        <div className="bg-white/80 rounded-2xl p-6 shadow-lg md:col-span-1">
          <div className="flex items-center mb-4">
            <img
              src={user.avatar || "/user-avatar.png"}
              alt="You"
              className="w-12 h-12 rounded-full border-2 border-[#6842ef] object-cover"
            />
            <div className="ml-3">
              <div className="font-bold text-[#6842ef]">
                {localStorage.getItem(`wishdom_user_name_${user._id}`) ||
                  user.name}
              </div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>
              <span className="font-bold text-[#6842ef]">Streak:</span> 7 days
            </li>
            <li>
              <span className="font-bold text-[#6842ef]">Level:</span> Seeker
            </li>
            <li>
              <span className="font-bold text-[#6842ef]">Last Meditation:</span>{" "}
              Today
            </li>
          </ul>
        </div>
        {/* Chat/Quote */}
        <div className="md:col-span-2 bg-white/90 rounded-2xl p-6 shadow-lg flex flex-col">
          <div className="flex items-center mb-2">
            <img
              src="/krishna-avatar.png"
              alt="Krishna"
              className="w-9 h-9 rounded-full border border-[#6842ef] mr-2"
            />
            <span className="font-bold text-[#6842ef]">
              {localStorage.getItem(`wishdom_krishna_name_${user._id}`) ||
                "Krishna"}
            </span>
            <span className="ml-2 text-xs bg-[#6842ef]/10 px-2 py-0.5 rounded-full text-[#6842ef]">
              AI Guide
            </span>
          </div>
          <div className="flex-1 bg-[#f8f7fb] rounded-xl p-4 mb-2 text-gray-700 text-lg italic">
            “Every moment you spend in My remembrance brings you closer to your
            true self.”
          </div>
          {/* Chat input (just UI for now) */}
          <form className="mt-2 flex items-center gap-2">
            <input
              type="text"
              disabled
              placeholder="Chat with Krishna (coming soon)"
              className="flex-1 p-3 bg-white border rounded-xl focus:border-[#6842ef] focus:ring-2"
            />
            <button
              type="button"
              disabled
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#6842ef] to-[#04b8e5] text-white font-bold opacity-60 cursor-not-allowed"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Dashboard/Analytics Section */}
      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Meditation Stats */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg mb-4">
          <div className="font-bold text-[#6842ef] mb-2">
            Your Meditation Overview
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <div className="text-lg font-bold text-[#6842ef]">12 Days</div>
              <div className="text-gray-600 text-xs">Current Streak</div>
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-[#6842ef]">43:20</div>
              <div className="text-gray-600 text-xs">Total Meditated</div>
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-[#6842ef]">Level 2</div>
              <div className="text-gray-600 text-xs">Progress</div>
            </div>
          </div>
          {/* Progress bar (UI only) */}
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6842ef] to-[#04b8e5] w-2/3"></div>
          </div>
        </div>
        {/* AI Analytics */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg mb-4">
          <div className="font-bold text-[#6842ef] mb-2">
            AI-Powered Insights
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Focus Rating</div>
              <div className="font-bold text-[#6842ef]">8.7/10</div>
            </div>
            <div>
              <div className="text-gray-500">Consistency</div>
              <div className="font-bold text-[#6842ef]">92%</div>
            </div>
            <div>
              <div className="text-gray-500">Avg. Session</div>
              <div className="font-bold text-[#6842ef]">14 min</div>
            </div>
            <div>
              <div className="text-gray-500">Mood Boost</div>
              <div className="font-bold text-[#6842ef]">+21%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community/Charts Section */}
      <section className="max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
        {/* Achievements, habits, etc. */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <div className="font-bold text-[#6842ef] mb-2">
            Your Spiritual Growth
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="block font-bold text-[#6842ef] text-lg">6</span>
              <span className="text-gray-500">Achievements</span>
            </div>
            <div>
              <span className="block font-bold text-[#6842ef] text-lg">4</span>
              <span className="text-gray-500">Daily Habits</span>
            </div>
            <div>
              <span className="block font-bold text-[#6842ef] text-lg">12</span>
              <span className="text-gray-500">Wisdom Cards</span>
            </div>
            <div>
              <span className="block font-bold text-[#6842ef] text-lg">8</span>
              <span className="text-gray-500">Meditations</span>
            </div>
          </div>
        </div>
        {/* Placeholder for chart (replace with real chart later) */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
          <div className="font-bold text-[#6842ef] mb-2">
            Your Meditation Trends
          </div>
          <div className="w-full h-32 bg-gradient-to-r from-[#6842ef]/10 to-[#04b8e5]/10 rounded-xl flex items-center justify-center text-gray-400">
            <span>Charts coming soon...</span>
          </div>
        </div>
      </section>
    </div>
  );
}
