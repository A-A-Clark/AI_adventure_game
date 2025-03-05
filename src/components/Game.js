import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadGame, saveGame, generateContent } from "../services/game.service";
import { useAuth } from "../contexts/AuthContext";
import SaveGameModal from "./SaveGameModal";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "./LoadingSpinner";

function Game() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const initialSetup = location.state;
  const [gameState, setGameState] = useState(null);
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await loadGame(token);
        if (res.data.state) {
          setGameState(res.data.state);
          setContent(res.data.state.narrative || "");
        }
      } catch (err) {
        console.error(err);
        // Avoid setting error here so as not to constantly show "No saved game found"
      }
    };
    fetchGame();
  }, [token]);

  // On initial render, if initialSetup data exists and no game state is saved, use it to set an initial prompt.
  useEffect(() => {
    if (initialSetup && !gameState) {
      const initialPrompt = `Genre: ${initialSetup.storyGenre}.
Character Name: ${initialSetup.characterName}.
Character Traits: ${initialSetup.characterTraits}.
Begin your adventure story:`;
      const generateInitialContent = async () => {
        setLoading(true);
        try {
          const res = await generateContent(initialPrompt, token);
          setContent(res.data.content);
          // Set the new game state with the generated narrative.
          setGameState({ narrative: res.data.content });
        } catch (err) {
          console.error(err);
          setError("Error generating initial content.");
        }
        setLoading(false);
      };

      generateInitialContent();
    }
  }, [initialSetup, gameState, token]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const prompt = input || "Start my adventure!";
      const res = await generateContent(prompt, token);
      setContent(res.data.content);
      // Update game state with new narrative if it exists; if no state, create one.
      const newState = gameState
        ? {
            ...gameState,
            narrative: (gameState.narrative || "") + "\n" + res.data.content,
          }
        : { narrative: res.data.content };
      setGameState(newState);
      setInput("");
    } catch (err) {
      console.error(err);
      setError("Error generating content.");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      await saveGame(gameState, token);
      alert("Game saved successfully!");
    } catch (err) {
      console.error(err);
      setError("Error saving game.");
    }
  };

  const handleLoadGame = async () => {
    try {
      const res = await loadGame(token);
      
      if (res.data.state && res.data.state.narrative && res.data.state.narrative.trim() !== "") {
        setGameState(res.data.state);
        setContent(res.data.state.narrative);
      } else {
        setError("No saved game found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading game.");
    }
  };
  

  const handleNewGame = async () => {
    // Reset game state to empty narrative
    const initialState = { narrative: "" };
    setGameState(initialState);
    setContent("");
    try {
      // Save the new, cleared game state to the backend.
      await saveGame(initialState, token);
      alert("New game started!");
    } catch (err) {
      console.error(err);
      setError("Error starting new game.");
    }
    // Redirect the user to the Character Setup page.
    navigate("/setup");
  };

  return (
    <div className="min-h-screen bg-blue-900 p-6">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="max-w-3xl mx-auto bg-blue-800 p-8 rounded shadow-lg">
        <div className="text-lg text-blue-50 whitespace-pre-wrap max-h-[400px] overflow-y-auto">
          <ReactMarkdown>
            {content || "Your adventure will appear here."}
          </ReactMarkdown>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      <div className="max-w-3xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between">
        <input
          type="text"
          className="w-full sm:w-auto flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your choice..."
        />
        <button
          onClick={handleGenerate}
          className="mt-4 sm:mt-0 sm:ml-4 bg-green-400 hover:bg-green-700 text-white py-3 px-6 rounded-full transition"
        >
          Continue Adventure
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-8 flex justify-center gap-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full transition"
        >
          Save Game
        </button>
        <button
          onClick={handleLoadGame}
          disabled={!gameState || !gameState.narrative}
          className={`py-3 px-6 rounded-full transition duration-300 ease-in-out ${
            gameState && gameState.narrative
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Load Saved Game
        </button>
        <button
          onClick={handleNewGame}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full transition duration-300 ease-in-out"
        >
          Start New Game
        </button>
      </div>
      {modalOpen && (
        <SaveGameModal
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default Game;
