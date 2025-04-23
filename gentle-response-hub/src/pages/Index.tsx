// A gentle tool to help make direct phrases sound kinder.
import React, { useState } from "react";
import { Smile, MessageCircle } from "lucide-react";
import { rephraseDirect } from "@/lib/rephrase";

// Card fade-in animation
const fadeIn = "animate-fadein";

const pastelBg =
  "bg-gradient-to-tr from-softblue via-softpurple to-softgreen";

const Index = () => {
  const [input, setInput] = useState("");
  const [gentle, setGentle] = useState("");
  const [showResult, setShowResult] = useState(false);

  async function handleRephrase(e: React.FormEvent) {
    e.preventDefault();
    const result = await rephraseDirect(input);
    setGentle(result);
    setShowResult(true);
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${pastelBg} font-sans`}
    >
      <div className="mb-8 max-w-xl text-center px-4">
        <div className="flex items-center justify-center mb-2 gap-1">
          <Smile className="text-gray-500 w-6 h-6" />
          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Gentle Response Helper
          </h1>
        </div>
        <p className="text-gray-600 text-md md:text-lg">
          Enter a direct or blunt phrase, and we'll suggest a more considerate alternative.{" "}
          <span className="inline-flex items-center"><MessageCircle className="w-4 h-4 mx-1 text-blue-400"/>No judgment—everyone deserves support.</span>
        </p>
      </div>
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-5 border border-softgray"
        onSubmit={handleRephrase}
      >
        <label className="text-lg font-semibold text-gray-800 mb-1" htmlFor="direct">
          Your phrase
        </label>
        <input
          id="direct"
          type="text"
          className="rounded-lg px-4 py-3 border border-softgray bg-softblue/50 placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          placeholder='e.g. "Shut the window!"'
          autoFocus
          required
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowResult(false);
          }}
        />
        <button
          type="submit"
          className="mt-2 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 flex items-center justify-center gap-2 transition"
        >
          <Smile className="w-5 h-5" />
          Make it nicer
        </button>
        {showResult && (
          <div className={`bg-softgreen/70 rounded-xl p-4 mt-2 ${fadeIn}`}>
            <div className="text-gray-700 font-medium text-base">Suggested gentle response:</div>
            <div className="text-xl text-gray-900 mt-2 font-bold">{gentle}</div>
          </div>
        )}
      </form>
      <footer className="mt-8 text-xs text-gray-400 text-center">
        For neurodivergent users and anyone who wants to communicate with care.
      </footer>
    </div>
  );
};

export default Index;
