import { InventoryItem, InventoryFormData, ApiResponse } from '../types/inventory'; 

// API Configuration - Use Vite proxy
const API_BASE_URL = '/api/inventory';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to parse server response'
    };
  }
};

// Helper function to handle API errors
const handleError = (error: unknown): ApiResponse<never> => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error instanceof Error ? error.message : 'Network error occurred'
  };
};

// GET /api/inventory - Get all items
export const getAllItems = async (): Promise<ApiResponse<InventoryItem[]>> => {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse<InventoryItem[]>(response);
  } catch (error) {
    return handleError(error);
  }
};

// GET /api/inventory/:id - Get single item
export const getItemById = async (id: string): Promise<ApiResponse<InventoryItem>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    return await handleResponse<InventoryItem>(response);
  } catch (error) {
    return handleError(error);
  }
};

// POST /api/inventory - Create new item
export const createItem = async (formData: InventoryFormData): Promise<ApiResponse<InventoryItem>> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await handleResponse<InventoryItem>(response);
  } catch (error) {
    return handleError(error);
  }
};

// PUT /api/inventory/:id - Update item
export const updateItem = async (id: string, formData: InventoryFormData): Promise<ApiResponse<InventoryItem>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    return await handleResponse<InventoryItem>(response);
  } catch (error) {
    return handleError(error);
  }
};

// DELETE /api/inventory/:id - Delete item
export const deleteItem = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    return await handleResponse<null>(response);
  } catch (error) {
    return handleError(error);
  }
};

// GET /api/inventory/category/:category - Get items by category
export const getItemsByCategory = async (category: string): Promise<ApiResponse<InventoryItem[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/category/${category}`);
    return await handleResponse<InventoryItem[]>(response);
  } catch (error) {
    return handleError(error);
  }
};

// GET /api/inventory/stats - Get inventory statistics
export const getInventoryStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    return await handleResponse<{
      totalItems: number;
      totalValue: number;
      totalQuantity: number;
    }>(response);
  } catch (error) {
    return handleError(error);
  }
};
