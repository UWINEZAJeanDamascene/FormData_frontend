export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  date: string;
  supplierName?: string;
  customerName: string;
  recordedBy: string;
  status: 'Active' | 'Discontinued' | 'Out of Stock';
  location: string;
  lastModified: string;
  notes: string;
}

export interface InventoryFormData {
  productId: string;
  productName: string;
  category?: string;
  quantity: number;
  unitPrice: number;
  supplierName?: string;
  customerName: string;
  recordedBy: string;
  status: 'Active' | 'Discontinued' | 'Out of Stock';
  location: string;
  notes: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
