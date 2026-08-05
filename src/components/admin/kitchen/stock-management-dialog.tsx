
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { IngredientStock, PackagingStock } from '@/lib/mock-kitchen-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StockManagementDialogProps {
  children: React.ReactNode;
  ingredientStock: IngredientStock;
  packagingStock: PackagingStock;
  setIngredientStock: React.Dispatch<React.SetStateAction<IngredientStock>>;
  setPackagingStock: React.Dispatch<React.SetStateAction<PackagingStock>>;
}

export function StockManagementDialog({ children, ingredientStock, packagingStock, setIngredientStock, setPackagingStock }: StockManagementDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  // State for updating existing stock
  const [updateType, setUpdateType] = useState<'ingredient' | 'packaging'>('ingredient');
  const [selectedItem, setSelectedItem] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');

  // State for adding new stock
  const [newItemType, setNewItemType] = useState<'ingredient' | 'packaging'>('ingredient');
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemThreshold, setNewItemThreshold] = useState('');

  const handleUpdateStock = () => {
    const quantity = parseFloat(updateQuantity);
    if (!selectedItem || isNaN(quantity)) {
      toast({ title: 'Invalid Input', description: 'Please select an item and enter a valid quantity.', variant: 'destructive' });
      return;
    }

    if (updateType === 'ingredient') {
      setIngredientStock(prev => ({ ...prev, [selectedItem]: { ...prev[selectedItem], quantity } }));
    } else {
      setPackagingStock(prev => ({ ...prev, [selectedItem]: { ...prev[selectedItem], quantity } }));
    }

    toast({ title: 'Stock Updated!', description: `${selectedItem} quantity set to ${quantity}.` });
    setUpdateQuantity('');
    setSelectedItem('');
    setOpen(false);
  };
  
  const handleAddNewItem = () => {
    const quantity = parseFloat(newItemQuantity);
    const threshold = parseFloat(newItemThreshold);

    if (!newItemName || isNaN(quantity)) {
         toast({ title: 'Invalid Input', description: 'Please enter a name and a valid quantity.', variant: 'destructive' });
         return;
    }
    
    if (newItemType === 'ingredient') {
        if (!newItemUnit) {
            toast({ title: 'Invalid Input', description: 'Please enter a unit for the ingredient.', variant: 'destructive' });
            return;
        }
        setIngredientStock(prev => ({ ...prev, [newItemName]: { quantity, unit: newItemUnit } }));
    } else {
        if (isNaN(threshold)) {
             toast({ title: 'Invalid Input', description: 'Please enter a valid minimum threshold.', variant: 'destructive' });
             return;
        }
        setPackagingStock(prev => ({ ...prev, [newItemName]: { quantity, minThreshold: threshold } }));
    }

    toast({ title: 'Item Added!', description: `${newItemName} has been added to your inventory.` });
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemUnit('');
    setNewItemThreshold('');
    setOpen(false);
  }

  const stockItems = updateType === 'ingredient' ? Object.keys(ingredientStock) : Object.keys(packagingStock);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stock Management</DialogTitle>
          <DialogDescription>Add new items or update quantities for your existing inventory.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="update" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="update">Update Existing</TabsTrigger>
                <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>
            <TabsContent value="update">
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="update-type" className="text-right">Type</Label>
                        <Select value={updateType} onValueChange={(value) => {setUpdateType(value as any); setSelectedItem('')}}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ingredient">Ingredient</SelectItem>
                                <SelectItem value="packaging">Packaging</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="item-name" className="text-right">Item</Label>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select an item..." />
                            </SelectTrigger>
                            <SelectContent>
                                {stockItems.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right">New Quantity</Label>
                        <Input id="quantity" type="number" value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} className="col-span-3" />
                    </div>
                </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleUpdateStock}>Save Changes</Button>
                </DialogFooter>
            </TabsContent>
            <TabsContent value="add">
                 <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-item-type" className="text-right">Type</Label>
                        <Select value={newItemType} onValueChange={(value) => setNewItemType(value as any)}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ingredient">Ingredient</SelectItem>
                                <SelectItem value="packaging">Packaging</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-item-name" className="text-right">Name</Label>
                        <Input id="new-item-name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="new-item-quantity" className="text-right">Quantity</Label>
                        <Input id="new-item-quantity" type="number" value={newItemQuantity} onChange={(e) => setNewItemQuantity(e.target.value)} className="col-span-3" />
                    </div>
                    {newItemType === 'ingredient' ? (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-item-unit" className="text-right">Unit</Label>
                            <Input id="new-item-unit" placeholder="e.g., kg, pack, bottle" value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)} className="col-span-3" />
                        </div>
                    ) : (
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-item-threshold" className="text-right">Min. Threshold</Label>
                            <Input id="new-item-threshold" type="number" value={newItemThreshold} onChange={(e) => setNewItemThreshold(e.target.value)} className="col-span-3" />
                        </div>
                    )}
                 </div>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddNewItem}>Add New Item</Button>
                </DialogFooter>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
