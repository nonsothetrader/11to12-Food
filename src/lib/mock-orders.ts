export type UserOrder = {
    userId: string;
    userName: string;
    orderDate: string; // e.g., "July 29, 2024"
    choice: 'accepted' | 'skipped';
    creditUsed: 'none' | 'extra-meal';
    status: 'Out for Delivery' | 'Delivered';
};

export type FullOrder = {
  orderId: string;
  userId: string;
  userName: string;
  orderDate: string;
  status: 'Delivered' | 'Pending' | 'Cancelled' | 'Out for Delivery';
  choice: 'accepted' | 'skipped';
  creditUsed: 'none' | 'extra-meal';
};

const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const createInitialOrders = (): { mockOrders: UserOrder[], mockOrdersFull: FullOrder[] } => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayDateStr = formatDate(today);
    const yesterdayDateStr = formatDate(yesterday);
    const tomorrowDateStr = formatDate(tomorrow);

    const userOrders: UserOrder[] = [
        { userId: 'user-001', userName: 'Alex Doe', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'extra-meal', status: 'Out for Delivery' },
        { userId: 'user-002', userName: 'Brenda Smith', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'none', status: 'Out for Delivery' },
        { userId: 'user-003', userName: 'Charles Brown', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'none', status: 'Out for Delivery' },
        { userId: 'user-004', userName: 'Diana Prince', orderDate: todayDateStr, choice: 'skipped', creditUsed: 'none', status: 'Out for Delivery' },
        { userId: 'user-005', userName: 'Ethan Hunt', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'extra-meal', status: 'Out for Delivery' },
        { userId: 'user-006', userName: 'Fiona Glenanne', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'none', status: 'Out for Delivery' },
        { userId: 'user-007', userName: 'George Constanza', orderDate: todayDateStr, choice: 'accepted', creditUsed: 'none', status: 'Out for Delivery' },
    ];

    const fullOrders: FullOrder[] = [
        // Today's Orders
        { orderId: '#FP2024-001', userId: 'user-001', userName: 'Alex Doe', orderDate: todayDateStr, status: 'Out for Delivery', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-002', userId: 'user-002', userName: 'Brenda Smith', orderDate: todayDateStr, status: 'Out for Delivery', choice: 'accepted', creditUsed: 'extra-meal' },
        { orderId: '#FP2024-003', userId: 'user-003', userName: 'Charles Brown', orderDate: todayDateStr, status: 'Out for Delivery', choice: 'accepted', creditUsed: 'none' },

        // Yesterday's Orders
        { orderId: '#FP2024-004', userId: 'user-004', userName: 'Diana Prince', orderDate: yesterdayDateStr, status: 'Delivered', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-005', userId: 'user-005', userName: 'Ethan Hunt', orderDate: yesterdayDateStr, status: 'Delivered', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-006', userId: 'user-006', userName: 'Fiona Glenanne', orderDate: yesterdayDateStr, status: 'Cancelled', choice: 'skipped', creditUsed: 'none' },

        // Tomorrow's Orders
        { orderId: '#FP2024-007', userId: 'user-001', userName: 'Alex Doe', orderDate: tomorrowDateStr, status: 'Pending', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-008', userId: 'user-002', userName: 'Brenda Smith', orderDate: tomorrowDateStr, status: 'Pending', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-009', userId: 'user-003', userName: 'Charles Brown', orderDate: tomorrowDateStr, status: 'Pending', choice: 'accepted', creditUsed: 'none' },
        { orderId: '#FP2024-010', userId: 'user-004', userName: 'Diana Prince', orderDate: tomorrowDateStr, status: 'Pending', choice: 'accepted', creditUsed: 'extra-meal' },
    ];

    return { mockOrders: userOrders, mockOrdersFull: fullOrders };
};


// In-memory store for our mock data
let { mockOrders, mockOrdersFull } = createInitialOrders();

// Function to get a fresh copy of the orders
export const getOrders = (): UserOrder[] => {
    const todayDateStr = formatDate(new Date());
    return JSON.parse(JSON.stringify(mockOrders.filter(o => o.orderDate === todayDateStr)));
}

export const getFullOrders = (): FullOrder[] => {
    return JSON.parse(JSON.stringify(mockOrdersFull));
}

// Function to update the status of an order
export const updateOrderStatus = (userId: string, orderDate: Date, status: FullOrder['status']) => {
    const dateString = formatDate(orderDate);

    const orderInMockOrders = mockOrders.find(o => o.userId === userId && o.orderDate === dateString);
    if (orderInMockOrders && (status === 'Delivered' || status === 'Out for Delivery')) {
        orderInMockOrders.status = status;
    }

    const orderInMockOrdersFull = mockOrdersFull.find(o => o.userId === userId && o.orderDate === dateString);
    if (orderInMockOrdersFull) {
        orderInMockOrdersFull.status = status;
    }
}
