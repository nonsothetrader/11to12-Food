
export type SupportTicket = {
  id: string;
  userId: string;
  date: string;
  subject: string;
  message: string;
  category: 'billing' | 'delivery' | 'meal-quality' | 'technical';
  status: 'Open' | 'In Progress' | 'Resolved';
};

export const mockTickets: SupportTicket[] = [
  {
    id: 'TICKET-001',
    userId: 'user-001',
    date: 'July 28, 2024',
    subject: 'Late Delivery on Tuesday',
    message: 'Hi team, my delivery on Tuesday arrived almost an hour late. Just wanted to let you know. The food was still great though!',
    category: 'delivery',
    status: 'Resolved',
  },
  {
    id: 'TICKET-002',
    userId: 'user-003',
    date: 'July 29, 2024',
    subject: 'Question about my billing cycle',
    message: 'Could you please clarify when my next billing date is? I thought it was the 30th but I want to be sure. Thanks!',
    category: 'billing',
    status: 'In Progress',
  },
  {
    id: 'TICKET-003',
    userId: 'user-002',
    date: 'July 30, 2024',
    subject: 'Chicken was a bit dry',
    message: "The Lemon Herb Chicken today was a little drier than usual. It's normally perfect, so I thought I'd mention it. Still a fan!",
    category: 'meal-quality',
    status: 'Open',
  },
   {
    id: 'TICKET-004',
    userId: 'user-004',
    date: 'July 30, 2024',
    subject: 'Website login issue',
    message: "I'm having trouble logging into my account on my laptop. The page just keeps refreshing. Mobile works fine.",
    category: 'technical',
    status: 'Open',
  },
];
