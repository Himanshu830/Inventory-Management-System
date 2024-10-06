
import { selector } from 'recoil';
import { productListState } from './atoms';

export const totalProductsState = selector({
  key: 'totalProductsState',
  get: ({ get }) => {
    const products = get(productListState);
    return products.length;
  },
});

export const totalStoreValueState = selector({
  key: 'totalStoreValueState',
  get: ({ get }) => {
    const products = get(productListState);
    
    const totalValue = products.reduce((acc, product) => {
      const price = typeof product.price === 'string' 
        ? parseFloat(product.price.replace('$', '')) 
        : product.price;
      
      return acc + (price * product.quantity);
    }, 0);
    
    return `$${totalValue.toFixed(2)}`;
  },
});

export const outOfStockState = selector({
  key: 'outOfStockState',
  get: ({ get }) => {
    const products = get(productListState);
    return products.filter(product => product.quantity === 0).length;
  },
});

export const categoryCountState = selector({
  key: 'categoryCountState',
  get: ({ get }) => {
    const products = get(productListState);
    const categories = new Set(products.map(product => product.category));
    return categories.size;
  },
});
                