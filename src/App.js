import React, { useEffect } from 'react';
import { useRecoilState,  } from 'recoil'; // Import useSetRecoilState for setting products
import { Form } from 'react-bootstrap'; // Use Bootstrap's Button
import AdminView from './components/AdminView';
import UserView from './components/UserView';
import { fetchInventory } from './api';
import { productListState, userRoleState } from './recoil/atoms';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { totalProductsState, totalStoreValueState, outOfStockState, categoryCountState } from './recoil/selectors';
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { HiMiniRectangleGroup } from "react-icons/hi2";


function App() {
  const [userRole, setUserRole] = useRecoilState(userRoleState); // Managing userRole with useRecoilState
  const setProducts = useRecoilState(productListState); // Use setRecoilState to update product list

  const totalProducts = useRecoilState(totalProductsState) 
  const totalStoresValue = useRecoilState(totalStoreValueState) 
  const outOfStock = useRecoilState(outOfStockState) 
  const categoryCount = useRecoilState(categoryCountState) 

  useEffect(() => {
    fetchInventory()
      .then(data => {
        if (Array.isArray(data)) { // Ensure data is an array
          const updatedData = data.map((item, index) => ({
            ...item,   
            id: index + 1  
          }));
          setProducts(updatedData); // Set the updated data in Recoil state
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
    setUserRole(userRole === 'admin' ? 'user' : 'admin'); // Toggle between admin and user
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
