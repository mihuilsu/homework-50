/**
 * Mock data generation utilities
 */

import { User } from '../types';

const firstNames = [
  'John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Jessica',
  'William', 'Ashley', 'James', 'Jennifer', 'Daniel', 'Amanda', 'Matthew',
  'Stephanie', 'Christopher', 'Nicole', 'Andrew', 'Elizabeth'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Customer Support',
  'Product',
  'Design'
];

/**
 * Generates a random user object
 */
const generateUser = (id: number): User => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`;
  const department = departments[Math.floor(Math.random() * departments.length)];
  const salary = Math.floor(Math.random() * 100000) + 40000; // 40k to 140k
  
  // Generate random date within last 5 years
  const today = new Date();
  const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
  const randomTime = fiveYearsAgo.getTime() + Math.random() * (today.getTime() - fiveYearsAgo.getTime());
  const joinDate = new Date(randomTime).toISOString().split('T')[0];

  return {
    id,
    name,
    email,
    department,
    salary,
    joinDate
  };
};

/**
 * Generates an array of mock users
 */
export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, i) => generateUser(i + 1));
};

/**
 * Simulates an expensive operation (for demonstration purposes)
 */
export const expensiveOperation = (data: User[], filterFn: (user: User) => boolean): User[] => {
  // Artificially slow down the operation to demonstrate performance impact
  const start = Date.now();
  while (Date.now() - start < 1) {
    // Busy wait for 1ms to simulate expensive operation
  }
  
  return data.filter(filterFn);
};