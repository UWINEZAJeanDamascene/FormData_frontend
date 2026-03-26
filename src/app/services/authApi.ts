// API Configuration - Use environment variable for production, fallback to localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
const AUTH_API_BASE = `${API_BASE_URL}/api/auth`;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role?: string;
  isActive?: boolean;
}

const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  return headers;
};

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${AUTH_API_BASE}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },

  getAllUsers: async () => {
    const response = await fetch(`${AUTH_API_BASE}/users`, {
      method: 'GET',
      headers: getHeaders(),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },

  createUser: async (userData: CreateUserData) => {
    const response = await fetch(`${AUTH_API_BASE}/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },

  updateUser: async (id: string, userData: Partial<CreateUserData>) => {
    const response = await fetch(`${AUTH_API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },

  deleteUser: async (id: string) => {
    const response = await fetch(`${AUTH_API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },

  resetPassword: async (id: string, newPassword: string) => {
    const response = await fetch(`${AUTH_API_BASE}/users/${id}/reset-password`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ newPassword }),
    });
    const data = await response.json();
    return { ...data, status: response.status };
  },
};