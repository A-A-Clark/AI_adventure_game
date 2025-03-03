// src/components/SaveGameModal.js
import React from 'react';

function SaveGameModal({ onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-11/12 max-w-sm">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Save Game</h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Do you want to save your current game progress?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => { onSave(); onClose(); }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveGameModal;
