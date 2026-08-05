
import type { HowItWorksStep, Testimonial, FaqItem, WeeklyMenuItem, UserProfile, MealHistoryData, RecentMeal, BillingHistoryItem, AdminMessageData } from './types';
import { toDateString } from './utils';

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Pick Your Plan',
    description: 'Choose how often you want to avoid the office cafeteria. We won’t judge.',
  },
  {
    step: 2,
    title: 'We Bring Food',
    description: 'A real person brings you a hot meal. It’s like magic, but with more traffic.',
  },
  {
    step: 3,
    title: 'You Eat',
    description: 'No cooking, no cleaning. Just try not to get any on your keyboard.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah J, Professional Email Sender',
    quote: 'I used to survive on Gala and spite. Now I survive on Gala, spite, and this Jollof Rice. It\'s an improvement.',
    avatar: {
      id: 'avatar-1',
      width: 100,
      height: 100,
      hint: 'woman portrait',
    },
  },
  {
    name: 'Michael B, Spreadsheet Wizard',
    quote: 'My VLOOKUPs are sharper and my soul is less crushed since I started ordering. Coincidence? Probably not.',
    avatar: {
      id: 'avatar-2',
      width: 100,
      height: 100,
      hint: 'man portrait',
    },
  },
  {
    name: 'Emily R, Manager of Things',
    quote: "Finally, a lunch that doesn't make me question all my life choices. Just most of them. Which is a win.",
    avatar: {
      id: 'avatar-3',
      width: 100,
      height: 100,
      hint: 'person portrait',
    },
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'So, what’s the deal here?',
    answer: 'You pay us, we bring you food. It’s a simple transaction that keeps you from eating another sad, soggy sandwich.',
  },
  {
    question: 'What if I hate the meal of the day?',
    answer: 'You can skip it. We’ll give you a credit. Your call, high-roller.',
  },
  {
    question: 'Does "skipping" mean I lose money?',
    answer: 'Nah, we’re not monsters. Your meal credit just moves to another day. Use it before your subscription ends or lose it forever.',
  },
  {
    question: 'Can I cancel or am I trapped forever?',
    answer: 'You can cancel anytime. We believe in freedom, unlike your open-plan office.',
  },
  {
    question: 'Do you work on weekends?',
    answer: 'No. We have lives too. Monday to Friday only.',
  },
  {
    question: 'When do I know what I’m eating?',
    answer: 'We send the menu on Sunday. Gives you something to look forward to other than the crushing weight of Monday morning.',
  },
  {
    question: 'Is delivery actually free?',
    answer: 'Yes. We deliver directly to your office hub or residence at no extra cost.',
  },
];

const newDishes: Omit<WeeklyMenuItem, 'day'>[] = [
    // Mixed Week 1
    { 
      mealName: 'Jellof Rice with Grilled Chicken', 
      image: { id: 'dish-jollof-rice', width: 600, height: 400, hint: 'jollof rice' },
      ingredients: ['Rice', 'Pepper', 'Tomato', 'Grilled Chicken', 'Plantain'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    { 
      mealName: 'Poraige Yam and Vegetables', 
      image: { id: 'dish-yam-porridge', width: 600, height: 400, hint: 'yam porridge' },
      ingredients: ['Yam', 'Palm Oil', 'Ugwu', 'Veggies'],
      mealType: 'Vegetarian',
      allergens: 'None'
    },
    { 
      mealName: 'Stir-fry Spag and 2 Boiled Egg', 
      image: { id: 'dish-spaghetti-beef', width: 600, height: 400, hint: 'spaghetti egg' },
      ingredients: ['Spaghetti', 'Eggs', 'Veggies', 'Oil'],
      mealType: 'Other',
      allergens: 'Gluten'
    },
    { 
      mealName: 'Moimoi and 3 in 1 Garri Mix', 
      image: { id: 'dish-beans-plantain', width: 600, height: 400, hint: 'moimoi garri' },
      ingredients: ['Beans', 'Garri', 'Sugar', 'Milk', 'Groundnut'],
      mealType: 'Other',
      allergens: 'Dairy, Nuts'
    },
    { 
      mealName: 'White Rice & Stew and Boiled Kote Fish', 
      image: { id: 'dish-ofada-rice', width: 600, height: 400, hint: 'rice stew fish' },
      ingredients: ['Rice', 'Stew', 'Kote Fish'],
      mealType: 'Fish',
      allergens: 'Fish'
    },
    // Mixed Week 2
    { 
      mealName: 'Fried Yam and Fish Sauce', 
      image: { id: 'dish-sweet-potato', width: 600, height: 400, hint: 'fried yam' },
      ingredients: ['Yam', 'Fish Sauce', 'Oil'],
      mealType: 'Fish',
      allergens: 'Fish'
    },
    { 
      mealName: 'Small Chops and Juice with Chicken', 
      image: { id: 'dish-okra-eba', width: 600, height: 400, hint: 'small chops' },
      ingredients: ['Puff-Puff', 'Samosa', 'Spring Roll', 'Chicken', 'Fruit Juice'],
      mealType: 'Chicken',
      allergens: 'Gluten'
    },
    { 
      mealName: 'Fried Rice with Grilled Chicken', 
      image: { id: 'dish-fried-rice', width: 600, height: 400, hint: 'fried rice' },
      ingredients: ['Rice', 'Carrot', 'Peas', 'Grilled Chicken'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    { 
      mealName: 'Pepper Soup with Yam', 
      image: { id: 'dash-meal-7', width: 600, height: 400, hint: 'pepper soup' },
      ingredients: ['Yam', 'Pepper Soup Spices', 'Assorted Meat'],
      mealType: 'Other',
      allergens: 'None'
    },
    { 
      mealName: 'Stir-fry Spag and Grilled Chicken', 
      image: { id: 'dish-spaghetti-beef', width: 600, height: 400, hint: 'spaghetti chicken' },
      ingredients: ['Spaghetti', 'Grilled Chicken', 'Veggies'],
      mealType: 'Chicken',
      allergens: 'Gluten'
    },
    // Mixed Week 3
    { 
      mealName: 'Shawama and Soda (Pepsi)', 
      image: { id: 'dash-meal-6', width: 600, height: 400, hint: 'shawarma' },
      ingredients: ['Cabbage', 'Chicken', 'Wrap', 'Cream', 'Pepsi'],
      mealType: 'Other',
      allergens: 'Gluten, Dairy'
    },
    { 
      mealName: 'Jellof Rice with Chopped Fried Meat', 
      image: { id: 'dish-jollof-rice', width: 600, height: 400, hint: 'jollof meat' },
      ingredients: ['Rice', 'Pepper', 'Tomato', 'Fried Beef', 'Plantain'],
      mealType: 'Beef',
      allergens: 'None'
    },
    { 
      mealName: 'Boiled Yam and Egg Sauce with Grilled Fish', 
      image: { id: 'dish-sweet-potato', width: 600, height: 400, hint: 'yam egg fish' },
      ingredients: ['Yam', 'Egg', 'Tomato', 'Grilled Fish'],
      mealType: 'Fish',
      allergens: 'Egg, Fish'
    },
    { 
      mealName: 'Red Oil Rice and Beans with Fried Fish', 
      image: { id: 'dish-coconut-rice', width: 600, height: 400, hint: 'rice beans fish' },
      ingredients: ['Rice', 'Beans', 'Palm Oil', 'Fried Fish'],
      mealType: 'Fish',
      allergens: 'Fish'
    },
    { 
      mealName: 'White Rice and Chicken Sauce', 
      image: { id: 'dish-veg-sauce', width: 600, height: 400, hint: 'rice chicken sauce' },
      ingredients: ['Rice', 'Chicken Sauce', 'Veggies'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    // Mixed Week 4
    { 
      mealName: 'Fried Yam with Pepper Ketchup and Grilled Chicken', 
      image: { id: 'dish-sweet-potato', width: 600, height: 400, hint: 'fried yam chicken' },
      ingredients: ['Yam', 'Ketchup', 'Pepper', 'Grilled Chicken'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    { 
      mealName: 'Red Oil Concortion Rice and Chopped Meat with 1 Boiled Egg', 
      image: { id: 'dish-ofada-rice', width: 600, height: 400, hint: 'concortion rice' },
      ingredients: ['Rice', 'Palm Oil', 'Beef', 'Egg'],
      mealType: 'Beef',
      allergens: 'Egg'
    },
    { 
      mealName: 'Boiled Yam and Vegetable Sauce', 
      image: { id: 'dish-veg-sauce', width: 600, height: 400, hint: 'yam veg sauce' },
      ingredients: ['Yam', 'Veggies', 'Oil'],
      mealType: 'Vegetarian',
      allergens: 'None'
    },
    { 
      mealName: 'Stir-fry Spag and Fried Chopped Meat', 
      image: { id: 'dish-spaghetti-beef', width: 600, height: 400, hint: 'spaghetti meat' },
      ingredients: ['Spaghetti', 'Beef', 'Veggies'],
      mealType: 'Beef',
      allergens: 'Gluten'
    },
    { 
      mealName: 'Red Oil Rice and Beans with Grilled Chicken', 
      image: { id: 'dish-coconut-rice', width: 600, height: 400, hint: 'rice beans chicken' },
      ingredients: ['Rice', 'Beans', 'Palm Oil', 'Grilled Chicken'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    // Extra variety
    { 
      mealName: 'Pepper Soup and White Rice', 
      image: { id: 'dish-jollof-rice', width: 600, height: 400, hint: 'rice pepper soup' },
      ingredients: ['Rice', 'Pepper Soup', 'Meat'],
      mealType: 'Other',
      allergens: 'None'
    },
    { 
      mealName: 'Grilled Plantain and Sauce and Grilled Fish', 
      image: { id: 'dish-beans-plantain', width: 600, height: 400, hint: 'boli fish' },
      ingredients: ['Plantain', 'Sauce', 'Fish'],
      mealType: 'Fish',
      allergens: 'Fish'
    },
    { 
      mealName: 'White Rice & Stew and Grilled Chicken', 
      image: { id: 'dish-veg-sauce', width: 600, height: 400, hint: 'rice stew chicken' },
      ingredients: ['Rice', 'Stew', 'Grilled Chicken'],
      mealType: 'Chicken',
      allergens: 'None'
    },
    { 
      mealName: 'White Rice and Vegetable Sauce', 
      image: { id: 'dish-veg-sauce', width: 600, height: 400, hint: 'rice veg sauce' },
      ingredients: ['Rice', 'Veggies', 'Oil'],
      mealType: 'Vegetarian',
      allergens: 'None'
    },
    { 
      mealName: 'Red Oil Rice and Beans with Chopped Fried Meat', 
      image: { id: 'dish-coconut-rice', width: 600, height: 400, hint: 'rice beans meat' },
      ingredients: ['Rice', 'Beans', 'Palm Oil', 'Fried Beef'],
      mealType: 'Beef',
      allergens: 'None'
    },
    { 
      mealName: 'Fried Rice with Chopped Fried Meat', 
      image: { id: 'dish-fried-rice', width: 600, height: 400, hint: 'fried rice meat' },
      ingredients: ['Rice', 'Veggies', 'Fried Beef'],
      mealType: 'Beef',
      allergens: 'None'
    },
    { 
      mealName: 'White Rice & Stew and Chopped Fried Meat', 
      image: { id: 'dish-ofada-rice', width: 600, height: 400, hint: 'white rice meat' },
      ingredients: ['Rice', 'Stew', 'Fried Beef'],
      mealType: 'Beef',
      allergens: 'None'
    },
    { 
      mealName: 'White Rice and Beans with Stew', 
      image: { id: 'dish-jollof-rice', width: 600, height: 400, hint: 'rice beans stew' },
      ingredients: ['Rice', 'Beans', 'Stew'],
      mealType: 'Vegetarian',
      allergens: 'None'
    }
];

// This function generates the initial menu map for the past 2 weeks and next 4 weeks.
const generateInitialMenu = (): Map<string, WeeklyMenuItem> => {
    const menu = new Map<string, WeeklyMenuItem>();
    const today = new Date();
    
    // Populate for 6 weeks (42 days) centered around today.
    // Start from 14 days in the past.
    for (let i = -14; i < 28; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        // Skip weekends (Saturday=6, Sunday=0)
        if (date.getDay() === 0 || date.getDay() === 6) {
            continue;
        }

        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        // This ensures the meal selection is somewhat consistent even when going back in time
        // and uses the full 28-dish rotation
        const daySinceEpoch = Math.floor(date.getTime() / (1000 * 3600 * 24));
        const dishIndex = daySinceEpoch % newDishes.length;
        const meal = newDishes[dishIndex];
        
        menu.set(toDateString(date), { ...meal, day: dayOfWeek });
    }

    return menu;
}


export const menuByDate = generateInitialMenu();


export const userProfile: UserProfile = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    subscriptionPlan: 'Pro (5 meals/week)',
    deliveryAddress: '123 Fresh Lane, Foodie City, 12345',
    mealCredits: 3,
    dietaryPreferences: 'Vegetarian',
    pastChoices: 'Salad, Pasta, Tofu stir-fry'
};

export const mealHistory: MealHistoryData[] = [
    { month: 'Jan', chicken: 10, beef: 5, vegetarian: 8 },
    { month: 'Feb', chicken: 12, beef: 6, vegetarian: 10 },
    { month: 'Mar', chicken: 8, beef: 4, vegetarian: 12 },
    { month: 'Apr', chicken: 11, beef: 7, vegetarian: 9 },
];

const getLastWeekdays = (today: Date, days: number): string[] => {
    const dates: string[] = [];
    let count = 0;
    for (let i = 1; count < days; i++) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        if (pastDate.getDay() !== 0 && pastDate.getDay() !== 6) { // Skip Sunday (0) and Saturday (6)
            dates.push(pastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
            count++;
        }
    }
    return dates.reverse(); // Get the most recent weekdays
};

const lastFiveWorkdays = getLastWeekdays(new Date(), 5);

export const recentMeals: RecentMeal[] = [
    {
      id: 'recent-1',
      name: 'Jellof Rice with Grilled Chicken',
      date: lastFiveWorkdays[4] || 'Last Monday',
      rating: 5,
      image: { id: 'dish-jollof-rice', width: 50, height: 50, hint: 'jollof rice' }
    },
    {
      id: 'recent-2',
      name: 'Stir-fry Spag and Grilled Chicken',
      date: lastFiveWorkdays[3] || 'Last Tuesday',
      rating: 4,
      image: { id: 'dish-spaghetti-beef', width: 50, height: 50, hint: 'spaghetti beef' }
    },
    {
      id: 'recent-3',
      name: 'Fried Rice with Chopped Fried Meat',
      date: lastFiveWorkdays[2] || 'Last Wednesday',
      rating: 0, // Not rated yet
      image: { id: 'dish-fried-rice', width: 50, height: 50, hint: 'fried rice' }
    },
    {
      id: 'recent-4',
      name: 'Poraige Yam and Vegetables',
      date: lastFiveWorkdays[1] || 'Last Thursday',
      rating: 0, // Not rated yet
      image: { id: 'dish-yam-porridge', width: 50, height: 50, hint: 'yam porridge' }
    },
    {
      id: 'recent-5',
      name: 'White Rice & Stew and Boiled Kote Fish',
      date: lastFiveWorkdays[0] || 'Last Friday',
      rating: 3,
      image: { id: 'dish-ofada-rice', width: 50, height: 50, hint: 'ofada rice' }
    }
];

export const billingHistory: BillingHistoryItem[] = [
    { id: '1', date: 'June 30, 2024', invoiceId: 'INV-20240630', amount: '₦44,000', },
    { id: '2', date: 'May 30, 2024', invoiceId: 'INV-20240530', amount: '₦44,000', },
    { id: '3', date: 'April 30, 2024', invoiceId: 'INV-20240430', amount: '₦44,000', },
];

export const mealHistoryFull: RecentMeal[] = [
    ...recentMeals,
    {
      id: 'recent-6',
      name: 'Red Oil Rice and Beans with Fried Fish',
      date: 'June 17, 2024',
      rating: 4,
      image: { id: 'dish-coconut-rice', width: 50, height: 50, hint: 'rice beans fish' }
    },
     {
      id: 'recent-7',
      name: 'Shawama and Soda (Pepsi)',
      date: 'June 14, 2024',
      rating: 5,
      image: { id: 'dash-meal-6', width: 50, height: 50, hint: 'shawarma' }
    }
];

export const adminMessage: AdminMessageData = {
    title: "Holiday Schedule Update",
    message: "Please note that we will be closed on the upcoming public holiday, next Monday. Please adjust your meal planning accordingly. Thank you!"
};
