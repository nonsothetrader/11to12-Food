export type IngredientStock = Record<string, { quantity: number; unit: string }>;
export type PackagingStock = Record<string, { quantity: number; minThreshold: number }>;

export const mealRecipes = {
    "Lemon Herb Chicken": {
        "Chicken Breast": 0.2, // kg
        "Lemon": 0.1, // kg
        "Rosemary": 0.01, // kg
        "Broccoli": 0.15, // kg
    },
};

export const ingredientStock: IngredientStock = {
    "Chicken Breast": { quantity: 50, unit: 'kg' },
    "Lemon": { quantity: 10, unit: 'kg' },
    "Rosemary": { quantity: 2, unit: 'kg' },
    "Broccoli": { quantity: 30, unit: 'kg' },
};

export const packagingStock: PackagingStock = {
    "Paper Packs": { quantity: 1000, minThreshold: 200 },
    "Wooden Cutlery": { quantity: 1500, minThreshold: 300 },
    "Serviettes": { quantity: 2000, minThreshold: 500 },
    "Delivery Bags": { quantity: 500, minThreshold: 100 },
};
