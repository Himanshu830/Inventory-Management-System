
import { atom } from 'recoil';

export const productListState = atom({
  key: 'productListState',
  default: [],
});

export const userRoleState = atom({
  key: 'userRoleState',
  default: 'user', // Can be 'admin' or 'user'
});
                