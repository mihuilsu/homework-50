/**
 * Main Application Component
 */

import React from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { DataTableDemo } from './components/demos/DataTableDemo';
import { TodoListDemo } from './components/demos/TodoListDemo';
import { ComparisonDemo } from './components/demos/ComparisonDemo';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master React Performance Optimization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore practical examples of <span className="text-primary-600 font-semibold">useMemo</span>, 
              <span className="text-primary-600 font-semibold"> useCallback</span>, and 
              <span className="text-primary-600 font-semibold"> React.memo</span> to build 
              lightning-fast React applications.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-blue-500">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">useMemo</h3>
              <p className="text-gray-600 text-sm">
                Memoize expensive calculations and derived data to avoid unnecessary recomputations
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-purple-500">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">useCallback</h3>
              <p className="text-gray-600 text-sm">
                Cache event handler functions to prevent child component re-renders
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">React.memo</h3>
              <p className="text-gray-600 text-sm">
                Wrap components to skip re-renders when props haven't changed
              </p>
            </div>
          </div>

          {/* Demo Sections */}
          <div className="space-y-12">
            <section id="data-table">
              <DataTableDemo />
            </section>

            <section id="todo-list">
              <TodoListDemo />
            </section>

            <section id="comparison">
              <ComparisonDemo />
            </section>
          </div>

          {/* Best Practices */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">📚 Best Practices & Key Takeaways</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3 text-primary-100">✅ When to Memoize</h4>
                <ul className="space-y-2 text-sm text-primary-50">
                  <li>• Expensive calculations or transformations</li>
                  <li>• Large lists or complex data structures</li>
                  <li>• Components that render frequently</li>
                  <li>• Callback functions passed to optimized children</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-primary-100">⚠️ When NOT to Memoize</h4>
                <ul className="space-y-2 text-sm text-primary-50">
                  <li>• Simple, cheap calculations</li>
                  <li>• Components that rarely re-render</li>
                  <li>• Props that change on every render anyway</li>
                  <li>• Premature optimization without measurement</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-primary-500">
              <p className="text-primary-100 text-sm">
                <strong>Remember:</strong> Always measure performance before and after optimization. 
                Use React DevTools Profiler to identify actual bottlenecks in your application.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;