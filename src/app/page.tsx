'use client';

import React, { useState } from 'react';
import { usePeopleApi } from './hooks/usePeopleApi';
import { format } from 'date-fns';

export default function RandomPersonGenerator() {
  const { currentPerson, personHistory, loading, error, fetchData } = usePeopleApi();
  const [selectedPerson, setSelectedPerson] = useState(null);

  // The person to display is either the selected one from history or the current one
  const displayPerson = selectedPerson || currentPerson;

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const handleHistoryClick = (person) => {
    setSelectedPerson(person);
  };

  const handleGenerateNew = () => {
    setSelectedPerson(null); // Clear selection when generating new
    fetchData();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for history */}
      <div className="w-64 bg-white p-4 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">History</h2>
        {personHistory.length === 0 ? (
          <p className="text-gray-500">No history yet</p>
        ) : (
          <div className="space-y-3">
            {personHistory.map((person, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg cursor-pointer text-sm transition-colors ${
                  person === selectedPerson ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleHistoryClick(person)}
              >
                <div className="flex items-center gap-2">
                  {person.image && (
                    <img 
                      src={person.image} 
                      alt={`${person.name}'s thumbnail`}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-gray-600 truncate">{person.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Random Person Generator</h1>
          
          <button
            onClick={handleGenerateNew}
            disabled={loading}
            className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating...' : 'Generate New Person'}
          </button>

          {selectedPerson && (
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Viewing history: {selectedPerson.name}
              </span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          {displayPerson && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Person image */}
                <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                  {displayPerson.image ? (
                    <img 
                      src={displayPerson.image} 
                      alt={`${displayPerson.name}'s profile picture`}
                      className="w-40 h-40 rounded-full object-cover shadow-md"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-500">
                      {displayPerson.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="p-6 w-full md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">{displayPerson.name}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium break-words">{displayPerson.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{displayPerson.phone}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Birthday</p>
                        <p className="font-medium">{formatDate(displayPerson.birthday)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Password</p>
                        <p className="font-mono bg-gray-100 p-1 rounded">{displayPerson.password}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}