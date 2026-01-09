/**
 * Type definitions for the application
 */

export interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
}

export interface FilterOptions {
  searchTerm: string;
  department: string;
  minSalary: number;
}

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'email' | 'department' | 'salary' | 'joinDate';