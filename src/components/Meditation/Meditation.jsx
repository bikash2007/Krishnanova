import React from "react";
import { Heart, Sparkles, Sun, Moon, BookOpen } from "lucide-react";

const Meditation = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Spiritual Practice Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover ancient wisdom and modern meditation techniques for your spiritual journey
          </p>
        </div>

        {/* Main Meditation Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Daily Krishna Meditation
            </h3>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Transform your Krishna keychain into a powerful meditation tool.
            Hold it during prayer, feel its sacred energy, and let it remind you
            of divine presence throughout your day.
          </p>

          {/* Prayer Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-4 h-4 text-yellow-500" />
              <h4 className="text-lg font-semibold text-gray-800">Morning Prayer</h4>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <p className="text-gray-700 italic text-center leading-relaxed">
                "Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
                <br />
                Hare Rama, Hare Rama, Rama Rama, Hare Hare"
              </p>
            </div>
          </div>
        </div>

        {/* Practice Tips Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Sacred Objects</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Use your Krishna keychain as a focal point during meditation. 
              Let its presence remind you of divine love and protection.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800">Daily Practice</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Start each day with the Hare Krishna mantra. Chant with devotion 
              and feel the divine energy flow through your being.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Heart className="w-4 h-4" />
            <span className="font-medium">Begin Your Practice</span>
            <Heart className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Meditation;
