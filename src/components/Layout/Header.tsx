/**
 * Application header component
 */

import React from 'react';
import { FaReact, FaGithub } from 'react-icons/fa';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <FaReact className="text-primary-600 text-3xl animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                React Memoization Demo
              </h1>
              <p className="text-primary-100 text-sm mt-1">
                Optimizing Performance with useMemo, useCallback & React.memo
              </p>
            </div>
          </div>
          
          <a 
            href="https://github.com/mihuilsu/homework-50"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200 shadow-md"
          >
            <FaGithub className="text-xl" />
            <span className="font-medium hidden sm:inline">View on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};