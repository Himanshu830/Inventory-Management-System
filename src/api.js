
const API_URL = 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';

export const fetchInventory = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }
  return response.json();
};
            