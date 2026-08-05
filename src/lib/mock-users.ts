
import type { PermissionKey } from "@/app/admin/layout";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'Active' | 'Paused' | 'Cancelled';
  credits: number;
  deliveryAddress: string;
};

export type AdminUser = {
  id: string;
  email: string;
  password?: string;
  permissions: Record<PermissionKey, boolean>;
};

export const mockUsers: MockUser[] = [
  {
    id: 'user-001',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    plan: 'Pro',
    status: 'Active',
    credits: 3,
    deliveryAddress: '123 Fresh Lane, Foodie City, 12345',
  },
  {
    id: 'user-002',
    name: 'Brenda Smith',
    email: 'brenda.s@workplace.com',
    plan: 'Enterprise',
    status: 'Active',
    credits: 10,
    deliveryAddress: '456 Corporate Blvd, Business Town, 67890',
  },
  {
    id: 'user-003',
    name: 'Charles Brown',
    email: 'charlieb@mail.net',
    plan: 'Starter',
    status: 'Paused',
    credits: 1,
    deliveryAddress: '789 Home St, Suburbia, 11223',
  },
  {
    id: 'user-004',
    name: 'Diana Prince',
    email: 'd.prince@themyscira.org',
    plan: 'Pro',
    status: 'Active',
    credits: 0,
    deliveryAddress: '1 Paradise Island, Amazonia, 33445',
  },
  {
    id: 'user-005',
    name: 'Ethan Hunt',
    email: 'ethan.h@imf.gov',
    plan: 'Enterprise',
    status: 'Cancelled',
    credits: 0,
    deliveryAddress: '22 Secret Agent Row, Langley, 54321',
  },
  {
    id: 'user-006',
    name: 'Fiona Glenanne',
    email: 'fifi@burnnotice.tv',
    plan: 'Starter',
    status: 'Active',
    credits: 5,
    deliveryAddress: '300 Ocean Drive, Miami, 98765',
  },
];

// This will act as our in-memory "database" for admin users.
let mockAdminUsers: AdminUser[] = [
  { 
    id: 'admin-1', 
    email: 'admin@11to12.com', 
    password: 'adminpass123',
    permissions: { dashboard: true, orders: true, users: true, menu: true, kitchen: true, inbox: true, analytics: true, settings: true } 
  },
  { 
    id: 'admin-2', 
    email: 'kitchen@11to12.com',
    password: 'kitchenpass',
    permissions: { dashboard: true, orders: false, users: false, menu: true, kitchen: true, inbox: false, analytics: false, settings: false } 
  },
  { 
    id: 'admin-3', 
    email: 'logistics@11to12.com',
    password: 'logisticspass',
    permissions: { dashboard: true, orders: true, users: false, menu: false, kitchen: false, inbox: true, analytics: false, settings: false } 
  },
];

export function getMockAdmins() {
  return [...mockAdminUsers];
}

export function addMockAdmin(admin: AdminUser) {
  if (!mockAdminUsers.find(a => a.email === admin.email)) {
    mockAdminUsers.push(admin);
  }
}

// Session management simulation
let loggedInUser: any = null;

export function setLoggedInUser(user: any) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  }
  loggedInUser = user;
}

export function getLoggedInUser() {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  }
  return loggedInUser;
}
