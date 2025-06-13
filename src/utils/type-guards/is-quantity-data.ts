export function isQuantityData(data: unknown): data is {
  lineItemId: string;
  quantity: number;
  totalPrice: number;
  discountedPrice?: number;
} {
  return (
    typeof data === 'object' &&
    data !== null &&
    'lineItemId' in data &&
    typeof data.lineItemId === 'string' &&
    'quantity' in data &&
    typeof data.quantity === 'number' &&
    'totalPrice' in data &&
    typeof data.totalPrice === 'number' &&
    ('discountedPrice' in data ? typeof data.discountedPrice === 'number' : true)
  );
}
