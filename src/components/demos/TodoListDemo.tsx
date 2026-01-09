/**
 * TodoListDemo - Demonstrates useCallback for preventing unnecessary child re-renders
 */

import React, { useState, useCallback, memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useRenderCount } from '../../hooks/useRenderCount';
import { Todo } from '../../types';
import { FaPlus, FaTrash, FaCheck, FaTasks } from 'react-icons/fa';

// Memoized child component - only re-renders when props change
const TodoItem = memo(({ 
  todo, 
  onToggle, 
  onDelete 
}: { 
  todo: Todo; 
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const renderCount = useRenderCount(`TodoItem-${todo.id}`);
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <FaCheck className="text-white text-xs" />}
        </button>
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.text}
        </span>
        <Badge variant="neutral" size="sm">
          Renders: {renderCount}
        </Badge>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-3 text-red-500 hover:text-red-700 transition-colors"
      >
        <FaTrash />
      </button>
    </div>
  );
});

TodoItem.displayName = 'TodoItem';

export const TodoListDemo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React memoization', completed: true, createdAt: Date.now() },
    { id: 2, text: 'Understand useCallback', completed: false, createdAt: Date.now() },
    { id: 3, text: 'Build optimized components', completed: false, createdAt: Date.now() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [counter, setCounter] = useState(0);
  
  const renderCount = useRenderCount('TodoListDemo');

  // MEMOIZED: Callback functions don't change on every render
  const handleToggle = useCallback((id: number) => {
    console.log('🚀 useCallback: Toggle todo', id);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Empty deps - function never changes

  const handleDelete = useCallback((id: number) => {
    console.log('🚀 useCallback: Delete todo', id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []); // Empty deps - function never changes

  const handleAdd = useCallback(() => {
    if (inputValue.trim()) {
      console.log('🚀 useCallback: Add todo');
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: Date.now(),
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');
    }
  }, [inputValue]); // Depends on inputValue

  const completedCount = todos.filter(t => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <Card variant="elevated" className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>
            <div className="flex items-center space-x-2">
              <FaTasks className="text-primary-600" />
              <span>Todo List with useCallback</span>
            </div>
          </CardTitle>
          <Badge variant="info">Renders: {renderCount}</Badge>
        </div>
        <p className="text-gray-600 text-sm">
          Demonstrates useCallback for memoizing event handlers and preventing unnecessary child re-renders
        </p>
      </CardHeader>

      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-900">{todos.length}</div>
            <div className="text-sm text-blue-600">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-900">{completedCount}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-900">{activeCount}</div>
            <div className="text-sm text-orange-600">Active</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Button onClick={handleAdd} variant="primary">
            <FaPlus className="mr-2" />
            Add
          </Button>
        </div>

        {/* Todo List */}
        <div className="space-y-2 mb-6">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add one to get started!
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Force Re-render Button */}
        <div className="flex justify-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCounter(c => c + 1)}
          >
            Force Parent Re-render ({counter})
          </Button>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="text-blue-600 font-bold">💡</div>
            <div className="text-sm text-blue-900 space-y-2">
              <p>
                <strong>useCallback in action:</strong> Each TodoItem tracks its render count. 
                When you click "Force Parent Re-render", notice that child components don't re-render 
                because the callback functions are memoized with useCallback.
              </p>
              <p>
                <strong>Without useCallback:</strong> Child components would re-render on every parent 
                re-render, even though their props haven't actually changed.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};