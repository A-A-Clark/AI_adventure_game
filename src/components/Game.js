// src/components/Game.js
import React, { useEffect, useState } from 'react';
import { loadGame, saveGame, generateContent } from '../services/game.service';
import { useAuth } from '../contexts/AuthContext';
import SaveGameModal from './SaveGameModal';
import ReactMarkdown from 'react-markdown';

function Game() {
  const { token } = useAuth();
  const [gameState, setGameState] = useState(null);
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [input, setInput] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await loadGame(token);
        if (res.data.state) {
          setGameState(res.data.state);
        }
      } catch (err) {
        console.error(err);
        setError('No saved game found.');
      }
    };
    fetchGame();
  }, [token]);

  const handleGenerate = async () => {
    try {
      const prompt = input || "Start my adventure!";
      const res = await generateContent(prompt, token);
      setContent(res.data.content);
      setGameState({ ...gameState, lastContent: res.data.content });
      setInput('');
    } catch (err) {
      console.error(err);
      setError('Error generating content.');
    }
  };

  const handleSave = async () => {
    try {
      await saveGame(gameState, token);
      alert('Game saved successfully!');
    } catch (err) {
      console.error(err);
      setError('Error saving game.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
    <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Adventure Game</h2>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow-lg">
      <div className="text-lg whitespace-pre-wrap max-h-[400px] overflow-y-auto">
        <ReactMarkdown>{content || 'Your adventure will appear here.'}</ReactMarkdown>
      </div>
    </div>
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
          className="mt-4 sm:mt-0 sm:ml-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded transition"
        >
          Continue Adventure
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded transition"
        >
          Save Game
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
