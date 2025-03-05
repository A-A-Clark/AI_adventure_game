import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterSetup = () => {
  const [characterName, setCharacterName] = useState('');
  const [characterTraits, setCharacterTraits] = useState('');
  const [storyGenre, setStoryGenre] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build an object with the details to pass along
    const setupData = { characterName, characterTraits, storyGenre };
    // Navigate to the main game page (/game) and pass the setup data in state
    navigate('/game', { state: setupData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-800 dark:to-gray-900 p-6">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Create Your Character
        </h2>
        <div className="mb-4">
          <label htmlFor="characterName" className="block text-gray-700 dark:text-gray-300 mb-2">
            Character Name:
          </label>
          <input
            id="characterName"
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="characterTraits" className="block text-gray-700 dark:text-gray-300 mb-2">
            Character Traits:
          </label>
          <input
            id="characterTraits"
            type="text"
            value={characterTraits}
            onChange={(e) => setCharacterTraits(e.target.value)}
            placeholder="Brave, witty, mysterious, etc."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="storyGenre" className="block text-gray-700 dark:text-gray-300 mb-2">
            Story Genre:
          </label>
          <input
            id="storyGenre"
            type="text"
            value={storyGenre}
            onChange={(e) => setStoryGenre(e.target.value)}
            placeholder="e.g. Sci-fi, Fantasy, Realism, etc."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition duration-300"
        >
          Start Your Journey
        </button>
      </form>
    </div>
  );
};

export default CharacterSetup;
