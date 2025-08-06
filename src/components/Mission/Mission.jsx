import React from "react";
import SectionTitle from "../UI/SectionTitle";
import Button from "../UI/Button";
import { Heart, Globe, Users, BookOpen } from "lucide-react";

const Mission = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <SectionTitle variant="primary" size="2xl">Our Divine Mission</SectionTitle>
        </div>
        
        {/* Main Mission Card */}
        <div className="card p-8 mb-8 divine-glow">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-red-500 sacred-pulse" />
              <h3 className="text-2xl font-semibold text-card-foreground">Bridging Sacred & Digital Realms</h3>
              <Heart className="w-6 h-6 text-red-500 sacred-pulse" />
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Krishnova bridges the sacred and digital realms, creating a global
              spiritual ecosystem where ancient wisdom meets modern technology.
              Through our blessed Krishna keychains and sacred texts, we connect
              souls across distances, fostering divine communities rooted in love,
              devotion, and timeless teachings.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-primary">
              <BookOpen className="w-5 h-5 divine-sparkle" />
              <span className="text-sm font-medium">Sacred Wisdom</span>
            </div>
          </div>
        </div>

        {/* Mission Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card p-6 gentle-float">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-card-foreground">Global Community</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Connecting devotees worldwide through digital platforms, fostering 
              spiritual growth and divine relationships across cultures and borders.
            </p>
          </div>

          <div className="card p-6 gentle-float" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-card-foreground">Divine Connections</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Creating meaningful spiritual bonds through shared devotion, 
              meditation practices, and collective worship experiences.
            </p>
          </div>

          <div className="card p-6 gentle-float" style={{ animationDelay: '1s' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-card-foreground">Sacred Knowledge</h4>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Preserving and sharing ancient wisdom through modern technology, 
              making spiritual teachings accessible to seekers everywhere.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Button
            variant="primary"
            size="md"
            className="sacred-pulse"
          >
            <Heart className="w-5 h-5 mr-2" />
            Join Our Divine Mission
            <Heart className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Mission;
