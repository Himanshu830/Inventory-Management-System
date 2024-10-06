import React, { useEffect } from 'react';
import { useRecoilState,  } from 'recoil'; 
import { Form } from 'react-bootstrap'; 
import AdminView from './components/AdminView';
import UserView from './components/UserView';
import { fetchInventory } from './api';
import { productListState, userRoleState } from './recoil/atoms';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { totalProductsState, totalStoreValueState, outOfStockState, categoryCountState } from './recoil/selectors';
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { HiMiniRectangleGroup } from "react-icons/hi2";


function App() {
  const [userRole, setUserRole] = useRecoilState(userRoleState); 
  const [products, setProducts] = useRecoilState(productListState);

  const totalProducts = useRecoilState(totalProductsState) 
  const totalStoresValue = useRecoilState(totalStoreValueState) 
  const outOfStock = useRecoilState(outOfStockState) 
  const categoryCount = useRecoilState(categoryCountState) 

  useEffect(() => {
    fetchInventory()
      .then(data => {
        if (Array.isArray(data)) {
          const updatedData = data.map((item, index) => ({
            ...item,   
            id: index + 1  
          }));
          setProducts(updatedData); 
          console.log("Fetched Products:", updatedData);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, [setProducts]);

  const toggleRole = () => {
    setUserRole(userRole === 'admin' ? 'user' : 'admin'); 
  };

  return (
    <> 
      <div className="inventory">
      <div className="inventory-switch">
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            label={`Switch to ${userRole === 'admin' ? 'User' : 'Admin'} View`}
            checked={userRole === 'admin'} 
            onChange={toggleRole} 
          />
        </Form>
      </div>
        <h1 className="text-left mb-4 mx-4">Inventory stats</h1>
        <div className="d-flex justify-content-between mx-4">
          <div className='inventory-card'>
          <MdOutlineShoppingCart size={22} />
            <span>Total Products</span><br/>
            <div>{totalProducts}</div>
          </div>
          <div className='inventory-card'>
            <RiExchangeDollarLine size={22} />
            <span>Total store value</span><br/>
            <div>{totalStoresValue}</div>
          </div>
          <div className='inventory-card'>
            <MdRemoveShoppingCart size={22} />
          <span>Out of stocks</span><br/>
            <div>{outOfStock}</div>
          </div>
          <div className='inventory-card'>
            <HiMiniRectangleGroup size={22}/>&nbsp;
            <span>No of Category</span><br/>
            <div>{categoryCount}</div>
          </div>
        </div>
        <div className='mx-4'>
          {userRole === 'admin' ? <AdminView /> : <UserView />}
        </div>
      </div>
    </>
  );
}

export default App;
