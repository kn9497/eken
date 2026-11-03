/**
 * Formats integer minor units (paise/cents) into Indian Rupee display format
 * e.g. 4500000 -> ₹45,000
 */
export function formatPrice(minorUnits) {
  const majorUnits = Math.round(minorUnits / 100);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(majorUnits);
}

/**
 * Calculates cart totals using strict integer minor unit arithmetic (D-02)
 * SHIPPING = 0, TAX_RATE = 0
 * Displayed total must equal subtotal.
 */
export const SHIPPING_MINOR_UNITS = 0;
export const TAX_RATE = 0;

export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function calculateTotal(subtotal) {
  // total = subtotal + shipping + tax
  const shipping = SHIPPING_MINOR_UNITS;
  const tax = Math.round(subtotal * TAX_RATE);
  return subtotal + shipping + tax;
}
