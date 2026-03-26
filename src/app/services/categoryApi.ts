import { Category, CategoryFormData } from '../types/inventory';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export const categoryApi = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch categories');
    }
    
    const result = await response.json();
    return result.data || [];
  },

  // Create new category
  create: async (categoryData: CategoryFormData): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create category');
    }
    
    const result = await response.json();
    return result.data;
  },

  // Delete category
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete category');
    }
  },
};