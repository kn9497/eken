/**
 * EKEN Architectural Orders Data Store
 * Contains customer order histories with integer minor units for currency consistency (D-01).
 * Strictly filtered by authenticated customer email to ensure customer privacy.
 */

export const initialOrders = [
  {
    id: 'EKEN-8924',
    customerEmail: 'aditya@example.com',
    status: 'WHITE-GLOVE DISPATCHED',
    items: [
      {
        productName: 'Eken Narmada Accent Chair',
        quantity: 1,
        thumbnail: '/assets/real/gemini2/p14.png',
      },
    ],
    deliveryCity: 'Koramangala, Bengaluru',
    totalMinorUnits: 3200000, // ₹32,000
    createdAt: '2026-10-18T10:30:00Z',
  },
  {
    id: 'EKEN-8419',
    customerEmail: 'aditya@example.com',
    status: 'DELIVERED',
    items: [
      {
        productName: 'Eken Indus 8-Seater Dining Table',
        quantity: 1,
        thumbnail: '/assets/real/gemini2/p4.png',
      },
    ],
    deliveryCity: 'Koramangala, Bengaluru',
    totalMinorUnits: 7800000, // ₹78,000
    createdAt: '2026-09-04T14:15:00Z',
  },
  {
    id: 'EKEN-8924',
    customerEmail: 'patron@example.com',
    status: 'WHITE-GLOVE DISPATCHED',
    items: [
      {
        productName: 'Eken Narmada Accent Chair',
        quantity: 1,
        thumbnail: '/assets/real/gemini2/p14.png',
      },
    ],
    deliveryCity: 'Koramangala, Bengaluru',
    totalMinorUnits: 3200000, // ₹32,000
    createdAt: '2026-10-18T10:30:00Z',
  },
];

/**
 * Filter orders strictly by customer email address.
 * Customers can only access orders tied to their authenticated account.
 */
export const getOrdersByCustomerEmail = (orders, email) => {
  if (!email || !Array.isArray(orders)) return [];
  const normalizedEmail = email.trim().toLowerCase();
  return orders.filter(
    (order) => order.customerEmail.trim().toLowerCase() === normalizedEmail
  );
};
