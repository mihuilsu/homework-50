/**
 * ComparisonDemo - Side-by-side comparison of memoized vs non-memoized components
 */

import React, { useState, memo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useRenderCount } from '../../hooks/useRenderCount';
import { FaBalanceScale, FaSync } from 'react-icons/fa';

// NON-MEMOIZED component - re-renders on every parent update
const NonMemoizedChild: React.FC<{ value: number }> = ({ value }) => {
  const renderCount = useRenderCount('NonMemoizedChild');
  
  return (
    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-red-900">❌ Without React.memo</h4>
        <Badge variant="danger">Renders: {renderCount}</Badge>
      </div>
      <div className="text-center py-8">
        <div className="text-4xl font-bold text-red-900 mb-2">{value}</div>
        <div className="text-sm text-red-700">
          This component re-renders on every parent update
        </div>
      </div>
      <div className="mt-4 text-xs text-red-600 bg-red-100 p-3 rounded">
        <strong>Performance Impact:</strong> Unnecessary re-renders waste CPU cycles and can 
        cause UI lag, especially with complex components.
      </div>
    </div>
  );
};

// MEMOIZED component - only re-renders when props change
const MemoizedChild = memo<{ value: number }>(({ value }) => {
  const renderCount = useRenderCount('MemoizedChild');
  
  return (
    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-green-900">✅ With React.memo</h4>
        <Badge variant="success">Renders: {renderCount}</Badge>
      </div>
      <div className="text-center py-8">
        <div className="text-4xl font-bold text-green-900 mb-2">{value}</div>
        <div className="text-sm text-green-700">
          This component only re-renders when props change
        </div>
      </div>
      <div className="mt-4 text-xs text-green-600 bg-green-100 p-3 rounded">
        <strong>Performance Benefit:</strong> By skipping unnecessary re-renders, React.memo 
        reduces CPU usage and improves app responsiveness.
      </div>
    </div>
  );
});

MemoizedChild.displayName = 'MemoizedChild';

export const ComparisonDemo: React.FC = () => {
  const [childValue, setChildValue] = useState(0);
  const [parentCounter, setParentCounter] = useState(0);
  
  const renderCount = useRenderCount('ComparisonDemo');

  return (
    <Card variant="elevated" className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>
            <div className="flex items-center space-x-2">
              <FaBalanceScale className="text-primary-600" />
              <span>React.memo Comparison</span>
            </div>
          </CardTitle>
          <Badge variant="info">Parent Renders: {renderCount}</Badge>
        </div>
        <p className="text-gray-600 text-sm">
          Side-by-side comparison showing the impact of React.memo on component re-renders
        </p>
      </CardHeader>

      <CardContent>
        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg border border-primary-200">
            <h3 className="font-bold text-primary-900 mb-4">Test Controls</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child Value (Affects Both Components)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={childValue}
                    onChange={(e) => setChildValue(Number(e.target.value))}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <Button onClick={() => setChildValue(v => v + 1)}>+1</Button>
                  <Button onClick={() => setChildValue(v => v - 1)} variant="secondary">-1</Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent State (Doesn't Affect Children)
                </label>
                <Button 
                  onClick={() => setParentCounter(c => c + 1)}
                  variant="outline"
                  className="w-full"
                >
                  <FaSync className="mr-2" />
                  Force Parent Re-render ({parentCounter})
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <NonMemoizedChild value={childValue} />
          <MemoizedChild value={childValue} />
        </div>

        {/* Explanation */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 font-bold text-xl">🧪</div>
              <div className="text-sm text-blue-900">
                <strong>Experiment:</strong> Click "Force Parent Re-render" and watch the render counts. 
                The non-memoized component re-renders every time, while the memoized component stays the same 
                because its props haven't changed.
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="text-purple-600 font-bold text-xl">💡</div>
              <div className="text-sm text-purple-900">
                <strong>Key Insight:</strong> React.memo performs a shallow comparison of props. If props 
                haven't changed, React skips rendering the component and reuses the last rendered result. 
                This is particularly valuable for expensive components or when rendering large lists.
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <div className="text-yellow-600 font-bold text-xl">⚠️</div>
              <div className="text-sm text-yellow-900">
                <strong>When to Use:</strong> React.memo is most beneficial when:
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Component renders often with the same props</li>
                  <li>Component's rendering is computationally expensive</li>
                  <li>Component is pure (same props = same output)</li>
                </ul>
                Don't overuse it - premature optimization can make code harder to maintain!
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{parentCounter}</div>
            <div className="text-sm text-gray-600">Parent Updates</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{childValue}</div>
            <div className="text-sm text-gray-600">Child Value</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};