'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getFullOrders } from '@/lib/mock-orders';
import { ingredientStock as initialIngredientStock, packagingStock as initialPackagingStock, mealRecipes } from '@/lib/mock-kitchen-data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Printer, PlusCircle, Trash2 } from 'lucide-react';
import { StockManagementDialog } from '@/components/admin/kitchen/stock-management-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const getStockStatus = (required: number, available: number) => {
    if (available < required) return { text: 'Shortage', color: 'bg-red-500', textColor: 'text-white' };
    if (available < required * 1.2) return { text: 'Low', color: 'bg-yellow-400', textColor: 'text-black' };
    return { text: 'OK', color: 'bg-green-500', textColor: 'text-white' };
};


export default function KitchenManagementPage() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const { toast } = useToast();

    // Manage stock in state to allow updates
    const [ingredientStock, setIngredientStock] = useState(initialIngredientStock);
    const [packagingStock, setPackagingStock] = useState(initialPackagingStock);

    const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const dateString = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // 1. Generate Cook List
    const todaysOrders = getFullOrders().filter(order => order.orderDate === dateString && order.choice !== 'skipped');
    const cookList = todaysOrders.reduce((acc, order) => {
        const mealName = "Lemon Herb Chicken"; // Simplified for mock
        acc[mealName] = (acc[mealName] || 0) + 1;
        if(order.creditUsed === 'extra-meal') {
            acc[mealName] = (acc[mealName] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // 2. Calculate Ingredient Requirements
    const requiredIngredients = Object.entries(cookList).reduce((acc, [mealName, quantity]) => {
        const recipe = mealRecipes[mealName as keyof typeof mealRecipes];
        if (recipe) {
            Object.entries(recipe).forEach(([ingredient, amount]) => {
                acc[ingredient] = (acc[ingredient] || 0) + (amount * quantity);
            });
        }
        return acc;
    }, {} as Record<string, number>);

    // 3. Calculate Packaging Requirements
    const totalMeals = todaysOrders.length;
    const requiredPackaging = {
        'Paper Packs': totalMeals,
        'Wooden Cutlery': totalMeals,
        'Serviettes': totalMeals,
        'Delivery Bags': Math.ceil(totalMeals / 5), // Assuming 5 meals per bag
    };

    const handleDelete = (type: 'ingredient' | 'packaging', name: string) => {
        if (type === 'ingredient') {
            setIngredientStock(prev => {
                const newStock = { ...prev };
                delete newStock[name as keyof typeof newStock];
                return newStock;
            });
        } else {
            setPackagingStock(prev => {
                const newStock = { ...prev };
                delete newStock[name as keyof typeof newStock];
                return newStock;
            });
        }
        toast({
            title: 'Item Deleted',
            description: `${name} has been removed from your inventory.`,
            variant: 'destructive',
        });
    }

    return (
        <div className="flex-1 p-4 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Kitchen Management</h1>
                    <p className="text-muted-foreground">Real-time overview of kitchen operations for {formattedDate}.</p>
                </div>
                 <StockManagementDialog
                    ingredientStock={ingredientStock}
                    packagingStock={packagingStock}
                    setIngredientStock={setIngredientStock}
                    setPackagingStock={setPackagingStock}
                 >
                    <Button>
                        <PlusCircle className="mr-2" /> Add/Update Stock
                    </Button>
                </StockManagementDialog>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Stock Overview</TabsTrigger>
                    <TabsTrigger value="cook-list">Cook List</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredient Tracker</TabsTrigger>
                    <TabsTrigger value="packaging">Packaging Inventory</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Stock Overview</CardTitle>
                            <CardDescription>At-a-glance status of all your inventory.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                           <div>
                                <h3 className="font-semibold mb-2">Critical Ingredients</h3>
                                <div className="space-y-2">
                                    {Object.entries(requiredIngredients).map(([name, required]) => {
                                        const stock = ingredientStock[name as keyof typeof ingredientStock];
                                        if (!stock) return null;
                                        const status = getStockStatus(required, stock.quantity);
                                        if (status.text !== 'OK') {
                                            return (
                                                <div key={name} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted">
                                                    <span>{name}</span>
                                                    <Badge className={cn(status.color, status.textColor)}>{status.text}</Badge>
                                                </div>
                                            )
                                        }
                                        return null;
                                    })}
                                </div>
                           </div>
                             <div>
                                <h3 className="font-semibold mb-2">Packaging Levels</h3>
                                <div className="space-y-2">
                                    {Object.entries(packagingStock).map(([name, stock]) => {
                                         const status = getStockStatus(stock.minThreshold * 1.2, stock.quantity); // Alert if close to min
                                         return (
                                            <div key={name} className="flex justify-between items-center text-sm p-2 rounded-md bg-muted">
                                                <span>{name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{stock.quantity}</span>
                                                    <Badge className={cn(status.color, status.textColor)}>{status.text}</Badge>
                                                </div>
                                            </div>
                                         )
                                    })}
                                </div>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cook-list">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Today's Cook List</CardTitle>
                                <CardDescription>Total meals to be prepared based on finalized orders.</CardDescription>
                            </div>
                            <Button variant="outline">
                                <Printer className="mr-2" /> Print List
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Meal</TableHead>
                                        <TableHead className="text-right">Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(cookList).map(([name, qty]) => (
                                        <TableRow key={name}>
                                            <TableCell className="font-medium">{name}</TableCell>
                                            <TableCell className="text-right font-bold text-lg">{qty}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="ingredients">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ingredient Tracker</CardTitle>
                            <CardDescription>Required ingredients for today's meals vs. available stock.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Ingredient</TableHead>
                                        <TableHead>Required</TableHead>
                                        <TableHead>Available</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(requiredIngredients).map(([name, required]) => {
                                        const stock = ingredientStock[name as keyof typeof ingredientStock];
                                        if (!stock) return null;
                                        const status = getStockStatus(required, stock.quantity);
                                        return (
                                            <TableRow key={name}>
                                                <TableCell className="font-medium">{name}</TableCell>
                                                <TableCell>{required.toFixed(2)} {stock.unit}</TableCell>
                                                <TableCell>{stock.quantity.toFixed(2)} {stock.unit}</TableCell>
                                                <TableCell>
                                                    <Badge className={cn(status.color, status.textColor)}>{status.text}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the item from your inventory.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete('ingredient', name)}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="packaging">
                    <Card>
                        <CardHeader>
                            <CardTitle>Packaging Inventory</CardTitle>
                            <CardDescription>Required packaging for today's deliveries vs. available stock.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Required</TableHead>
                                        <TableHead>Available</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                     {Object.entries(requiredPackaging).map(([name, required]) => {
                                        const stock = packagingStock[name as keyof typeof packagingStock];
                                        if (!stock) return null;
                                        const status = getStockStatus(required, stock.quantity);
                                        return (
                                            <TableRow key={name}>
                                                <TableCell className="font-medium">{name}</TableCell>
                                                <TableCell>{required}</TableCell>
                                                <TableCell>{stock.quantity}</TableCell>
                                                <TableCell>
                                                    <Badge className={cn(status.color, status.textColor)}>{status.text}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone. This will permanently delete the item from your inventory.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete('packaging', name)}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
