/**
 * Application footer component
 */

import React from 'react';
import { FaHeart, FaGithub } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-gray-400">Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-gray-400">by</span>
            <a 
              href="https://github.com/mihuilsu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
            >
              mihuilsu
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/mihuilsu/homework-50"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaGithub className="text-xl" />
              <span>homework-50</span>
            </a>
            
            <span className="text-gray-500">|</span>
            
            <span className="text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved
            </span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            A demonstration project showcasing React performance optimization techniques
          </p>
        </div>
      </div>
    </footer>
  );
};