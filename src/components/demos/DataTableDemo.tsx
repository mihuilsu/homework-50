/**
 * DataTableDemo - Demonstrates useMemo for expensive filtering and calculations
 */

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { generateUsers } from '../../utils/dataGenerator';
import { calculateStatistics } from '../../utils/calculations';
import { useRenderCount } from '../../hooks/useRenderCount';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { FaSearch, FaChartBar, FaSync } from 'react-icons/fa';

const INITIAL_USERS = generateUsers(500);

export const DataTableDemo: React.FC = () => {
  const [users] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [counter, setCounter] = useState(0);
  
  const renderCount = useRenderCount('DataTableDemo');
  const debouncedSearch = useDebouncedValue(searchTerm, 300);

  // Get unique departments
  const departments = useMemo(() => {
    console.log('🔄 Calculating unique departments...');
    return ['all', ...Array.from(new Set(users.map(u => u.department)))];
  }, [users]);

  // MEMOIZED: Expensive filtering operation
  const filteredUsers = useMemo(() => {
    console.log('🚀 useMemo: Filtering users...');
    const start = performance.now();
    
    const result = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           user.email.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
    
    const end = performance.now();
    console.log(`⏱️ Filter time: ${(end - start).toFixed(2)}ms`);
    
    return result;
  }, [users, debouncedSearch, selectedDepartment]);

  // MEMOIZED: Complex statistics calculation
  const statistics = useMemo(() => {
    console.log('🚀 useMemo: Calculating statistics...');
    return calculateStatistics(filteredUsers);
  }, [filteredUsers]);

  return (
    <Card variant="elevated" className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <CardTitle>
            <div className="flex items-center space-x-2">
              <FaChartBar className="text-primary-600" />
              <span>Data Table with useMemo</span>
            </div>
          </CardTitle>
          <Badge variant="info">Renders: {renderCount}</Badge>
        </div>
        <p className="text-gray-600 text-sm">
          Demonstrates useMemo for expensive filtering and statistical calculations
        </p>
      </CardHeader>

      <CardContent>
        {/* Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCounter(c => c + 1)}
            >
              <FaSync className="mr-2" />
              Force Re-render ({counter})
            </Button>
            <span className="text-sm text-gray-600">
              {filteredUsers.length} of {users.length} users
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Total Employees</div>
            <div className="text-2xl font-bold text-blue-900">{statistics.totalEmployees}</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Avg Salary</div>
            <div className="text-2xl font-bold text-green-900">
              ${statistics.averageSalary.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Median Salary</div>
            <div className="text-2xl font-bold text-purple-900">
              ${statistics.medianSalary.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="text-sm text-orange-600 font-medium">Calc Time</div>
            <div className="text-2xl font-bold text-orange-900">
              {statistics.calculationTime.toFixed(2)}ms
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.slice(0, 10).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-sm">
                    <Badge variant="info" size="sm">{user.department}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ${user.salary.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length > 10 && (
            <div className="text-center py-4 text-sm text-gray-500 bg-gray-50">
              Showing 10 of {filteredUsers.length} results
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <div className="text-blue-600 font-bold">💡</div>
            <div className="text-sm text-blue-900">
              <strong>useMemo in action:</strong> The filtering and statistics calculations only run when 
              dependencies change (search term, department filter). Click "Force Re-render" to see that 
              expensive calculations are skipped when unrelated state changes.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};