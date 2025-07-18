import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked. User must interact.");
      });
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Try to start muted on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          console.log("Autoplay blocked on mount.");
        });
    }
  }, []);

  return (
    <div className="flex items-center gap-2 p-4">
      <audio ref={audioRef} loop>
        <source src={`${import.meta.env.BASE_URL}/bg.mp3`} type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="bg-yellow-400 top-20 z-50 fixed text-black px-4 py-2 rounded shadow hover:bg-yellow-500 transition"
      >
        {isPlaying ? "🔇 Stop Music" : "🔊 Play Music"}
      </button>
    </div>
  );
}
