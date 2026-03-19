import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { InventoryItem, InventoryFormData } from '../types/inventory';
import { getAllItems, createItem, updateItem, deleteItem, getInventoryStats } from '../services/inventoryApi';
import { InventoryForm } from '../components/InventoryForm';
import { InventoryTable } from '../components/InventoryTable';
import { StatsCards } from '../components/StatsCards';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Home, Package, Search } from 'lucide-react';

export function Dashboard() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState({ totalItems: 0, totalValue: 0, totalQuantity: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const response = await getAllItems();
    if (response.success && response.data) {
      setItems(response.data);
      setFilteredItems(response.data);
    } else {
      toast.error(response.message || 'Failed to load items');
    }
    setIsLoading(false);
  };

  const fetchStats = async () => {
    const response = await getInventoryStats();
    if (response.success && response.data) {
      setStats(response.data);
    }
  };

  const handleCreate = async (formData: InventoryFormData) => {
    setIsSubmitting(true);
    const response = await createItem(formData);
    if (response.success && response.data) {
      setItems(prev => [...prev, response.data!]);
      toast.success(response.message || 'Record created successfully');
      setShowForm(false);
    } else {
      toast.error(response.message || 'Failed to create record');
    }
    setIsSubmitting(false);
  };

  const handleUpdate = async (formData: InventoryFormData) => {
    if (!editingItem) return;
    
    setIsSubmitting(true);
    const response = await updateItem(editingItem.id, formData);
    if (response.success && response.data) {
      setItems(prev => prev.map(item => item.id === editingItem.id ? response.data! : item));
      toast.success(response.message || 'Record updated successfully');
      setEditingItem(null);
    } else {
      toast.error(response.message || 'Failed to update record');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    
    const response = await deleteItem(id);
    if (response.success) {
      setItems(prev => prev.filter(item => item.id !== id));
      toast.success(response.message || 'Record deleted successfully');
    } else {
      toast.error(response.message || 'Failed to delete record');
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCancelAdd = () => {
    setShowForm(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredItems(items);
    } else {
      const lowerTerm = term.toLowerCase();
      const filtered = items.filter(item =>
        (item.productName && item.productName.toLowerCase().includes(lowerTerm)) ||
        (item.category && item.category.toLowerCase().includes(lowerTerm)) ||
        (item.location && item.location.toLowerCase().includes(lowerTerm)) ||
        (item.customerName && item.customerName.toLowerCase().includes(lowerTerm))
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Package className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Field Data</span>
              </Link>
              <span className="text-sm text-muted-foreground hidden sm:inline">Records</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Records</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize your field data records
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, category, location, or customer..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Record
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalItems={stats.totalItems}
          totalValue={stats.totalValue}
          totalQuantity={stats.totalQuantity}
        />

        {/* Table */}
        <InventoryTable
          items={filteredItems}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Add Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new record to your data.
            </DialogDescription>
          </DialogHeader>
          <InventoryForm
            onSubmit={handleCreate}
            onCancel={handleCancelAdd}
            isLoading={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogDescription>
              Update the details of the selected record.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <InventoryForm
              onSubmit={handleUpdate}
              onCancel={handleCancelEdit}
              initialData={editingItem}
              isLoading={isSubmitting}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}