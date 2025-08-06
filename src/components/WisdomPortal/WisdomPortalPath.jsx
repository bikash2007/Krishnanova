import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Brain, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MessageCircle,
  Lightbulb,
  Zap,
  Heart,
  Crown
} from "lucide-react";

const WisdomPortalPath = () => {
  return (
    <section id="wisdom" className="py-8 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Sacred Wisdom Coming Soon
            </h2>
          </div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Our <span className="text-blue-600 font-semibold">GPT Gita</span> integration launches in{" "}
            <span className="text-orange-600 font-bold">2 days!</span> Ask Krishna any question & receive personalized wisdom from the{" "}
            <span className="text-blue-600 font-semibold">Bhagavad Gita</span>.
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-500 text-sm">Bridging eternal teachings & modern AI</span>
            <Crown className="w-4 h-4 text-purple-500" />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: Brain,
              title: "AI-Powered",
              description: "Advanced GPT technology for personalized responses",
              bgColor: "bg-blue-50",
              iconColor: "text-blue-600",
              borderColor: "border-blue-200"
            },
            {
              icon: Clock,
              title: "Coming Soon",
              description: "Launch in just 2 days",
              bgColor: "bg-orange-50",
              iconColor: "text-orange-600",
              borderColor: "border-orange-200"
            },
            {
              icon: MessageCircle,
              title: "Ask Krishna",
              description: "Get wisdom from the Bhagavad Gita",
              bgColor: "bg-purple-50",
              iconColor: "text-purple-600",
              borderColor: "border-purple-200"
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className={`${feature.bgColor} ${feature.borderColor} border rounded-xl p-5 text-center hover:shadow-lg transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-10 h-10 ${feature.iconColor} mx-auto mb-3`}>
                  <IconComponent className="w-full h-full" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-gray-900">Instant Wisdom</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Get immediate answers to life's questions with AI-powered insights from ancient scriptures.
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-purple-600" />
              <h4 className="text-lg font-semibold text-gray-900">Personalized Guidance</h4>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Receive tailored spiritual advice based on your unique journey and circumstances.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/wishdomportal">
            <motion.button
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Lightbulb className="w-5 h-5" />
              <span>Explore Wisdom Portal</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span>Experience divine wisdom through modern technology</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WisdomPortalPath;
