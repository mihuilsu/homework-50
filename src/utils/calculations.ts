/**
 * Expensive calculation utilities for demonstrating useMemo benefits
 */

import { User } from '../types';

/**
 * Calculates Fibonacci number recursively (expensive operation)
 */
export const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

/**
 * Calculates complex statistics from user data
 */
export const calculateStatistics = (users: User[]) => {
  console.log('🔄 Calculating statistics...');
  
  // Simulate expensive calculation
  const start = performance.now();
  
  const totalSalary = users.reduce((sum, user) => sum + user.salary, 0);
  const averageSalary = users.length > 0 ? totalSalary / users.length : 0;
  
  const departmentStats = users.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = { count: 0, totalSalary: 0 };
    }
    acc[user.department].count++;
    acc[user.department].totalSalary += user.salary;
    return acc;
  }, {} as Record<string, { count: number; totalSalary: number }>);
  
  const departmentAverages = Object.entries(departmentStats).map(([dept, stats]) => ({
    department: dept,
    averageSalary: stats.totalSalary / stats.count,
    employeeCount: stats.count
  }));
  
  // Sort salaries to find median
  const sortedSalaries = [...users].map(u => u.salary).sort((a, b) => a - b);
  const median = sortedSalaries.length % 2 === 0
    ? (sortedSalaries[sortedSalaries.length / 2 - 1] + sortedSalaries[sortedSalaries.length / 2]) / 2
    : sortedSalaries[Math.floor(sortedSalaries.length / 2)];
  
  const end = performance.now();
  
  return {
    totalEmployees: users.length,
    averageSalary: Math.round(averageSalary),
    medianSalary: Math.round(median),
    totalSalaryExpense: totalSalary,
    departmentAverages,
    calculationTime: end - start
  };
};

/**
 * Performs expensive filtering with artificial delay
 */
export const expensiveFilter = <T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] => {
  console.log('🔄 Running expensive filter...');
  
  // Simulate expensive operation
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += Math.sqrt(i);
  }
  
  return array.filter(predicate);
};

/**
 * Sorts array with performance logging
 */
export const performSort = <T>(
  array: T[],
  compareFn: (a: T, b: T) => number
): T[] => {
  console.log('🔄 Sorting array...');
  return [...array].sort(compareFn);
};