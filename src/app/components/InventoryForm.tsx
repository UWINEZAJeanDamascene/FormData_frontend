import { useState, useEffect } from 'react';
import { InventoryFormData, InventoryItem } from '../types/inventory';
import { categoryApi } from '../services/categoryApi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface InventoryFormProps {
  onSubmit: (data: InventoryFormData) => void;
  onCancel?: () => void;
  initialData?: InventoryItem;
  isLoading?: boolean;
}

const defaultCategories = [
  'Electronics',
  'Accessories',
  'Furniture',
  'Office Supplies',
  'Clothing',
  'Food & Beverage',
  'Hardware',
  'Software',
  'Other'
];

export function InventoryForm({ onSubmit, onCancel, initialData, isLoading }: InventoryFormProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await categoryApi.getAll();
      // Use categories from API or fall back to defaults
      const categoryNames = fetchedCategories.length > 0 
        ? fetchedCategories.map(c => c.name) 
        : defaultCategories;
      setCategories(categoryNames);
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories(defaultCategories);
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
      setShowCategoryInput(false);
    }
  };

  const [formData, setFormData] = useState<InventoryFormData>({
    productId: '',
    productName: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    supplierName: '',
    customerName: '',
    recordedBy: '',
    status: 'Active',
    
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        productId: initialData.productId,
        productName: initialData.productName,
        category: initialData.category || '',
        quantity: initialData.quantity,
        unitPrice: initialData.unitPrice,
        supplierName: initialData.supplierName,
        customerName: initialData.customerName,
        recordedBy: initialData.recordedBy,
        status: initialData.status,
        
        location: initialData.location,
        notes: initialData.notes
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof InventoryFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculatedTotal = formData.quantity * formData.unitPrice;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Item' : 'Add New Item'}</CardTitle>
        <CardDescription>
          {initialData ? 'Update the inventory item details below' : 'Fill in the details to add a new inventory item'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product ID - Auto-generated */}
            <div className="space-y-2">
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                value="Auto-generated"
                disabled
                className="bg-muted"
              />
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name *</Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                value={formData.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <div className="flex gap-2">
                <Select value={formData.category || ''} onValueChange={(value) => {
                  if (value === 'add_new') {
                    setShowCategoryInput(true);
                  } else {
                    handleChange('category', value);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                    <SelectItem value="add_new" className="font-medium text-primary">
                      + Add New Category
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {showCategoryInput && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter new category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <Button type="button" onClick={handleAddCategory} size="sm">
                    Add
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCategoryInput(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value as 'Active' | 'Discontinued' | 'Out of Stock')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Discontinued">Discontinued</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', Number(e.target.value))}
                required
              />
            </div>

            {/* Unit Price */}
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Unit Price (FRW) *</Label>
              <Input
                id="unitPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.unitPrice}
                onChange={(e) => handleChange('unitPrice', Number(e.target.value))}
                required
              />
            </div>

            {/* Total Value (Calculated) */}
            <div className="space-y-2">
              <Label htmlFor="totalValue">Total Value (FRW)</Label>
              <Input
                id="totalValue"
                type="text"
                value={calculatedTotal.toFixed(2)}
                disabled
                className="bg-muted"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Warehouse A-12"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                required
              />
            </div>

            {/* Supplier Name */}
            <div className="space-y-2">
              <Label htmlFor="supplierName">Supplier Name</Label>
              <Input
                id="supplierName"
                placeholder="Enter supplier name"
                value={formData.supplierName}
                onChange={(e) => handleChange('supplierName', e.target.value)}
              />
            </div>

            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) => handleChange('customerName', e.target.value)}
              />
            </div>

            {/* Recorded By */}
            <div className="space-y-2">
              <Label htmlFor="recordedBy">Recorded By *</Label>
              <Input
                id="recordedBy"
                placeholder="Enter your name"
                value={formData.recordedBy}
                onChange={(e) => handleChange('recordedBy', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or comments..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : initialData ? 'Update Item' : 'Add Item'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
