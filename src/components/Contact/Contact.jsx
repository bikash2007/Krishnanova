import React from "react";
import { Mail, MessageCircle, Bell, Users, Heart, Sparkles } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Connect with Our Sacred Circle
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Ready to begin your sacred journey? Connect with us for guidance and support.
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">
                Join Our Spiritual Family
              </h3>
              <Heart className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-gray-600">
              Choose your preferred way to connect with our community
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3 max-w-md mx-auto">
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Mail className="w-5 h-5" />
              Email Us
            </button>
            
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
              <Sparkles className="w-4 h-4 text-yellow-300 ml-2" />
            </button>
            
            <button className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Bell className="w-5 h-5" />
              Join Newsletter
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              We're here to support your spiritual journey
            </p>
          </div>
        </div>

        {/* Floating Krishna Hint */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-600">Catch Me If You Can</span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
