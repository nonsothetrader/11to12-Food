export type ImageDetails = {
  id: string;
  width: number;
  height: number;
  hint: string;
};

export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
};

export type Testimonial = {
  name: string;
  quote: string;
  avatar: ImageDetails;
};

export type PricingPlan = {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  cta: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type WeeklyMenuItem = {
    day: string;
    mealName: string;
    image: ImageDetails;
    ingredients: string[];
    mealType: 'Chicken' | 'Beef' | 'Fish' | 'Vegetarian' | 'Other';
    allergens: string;
};

export type UserProfile = {
    name: string;
    email: string;
    subscriptionPlan: string;
    deliveryAddress: string;
    mealCredits: number;
    dietaryPreferences: string;
    pastChoices: string;
};

export type MealHistoryData = {
    month: string;
    chicken: number;
    beef: number;
    vegetarian: number;
};

export type RecentMeal = {
    id: string;
    name: string;
    date: string;
    rating: number; // 0 for unrated
    image: ImageDetails;
};

export type BillingHistoryItem = {
    id: string;
    date: string;
    invoiceId: string;
    amount: string;
};

export type AdminMessageData = {
    title: string;
    message: string;
};

export type CustomPlan = {
  totalMeals: number;
  selectedDates: Date[];
  totalCost: number;
}
