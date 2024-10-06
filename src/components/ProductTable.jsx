import React from 'react';
import { Table, Button } from 'react-bootstrap'; // Use Bootstrap's Table and Button
import { useRecoilValue } from 'recoil';
import { productListState, userRoleState } from '../recoil/atoms';
import { FaTrash } from 'react-icons/fa'; // Icons from React Icons
import { FaEye } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import styles from "./style.module.css"; // Import the CSS module

const ProductTable = ({ onEdit, onDelete, onDisable }) => {
  const productList = useRecoilValue(productListState);
  const userRole = useRecoilValue(userRoleState);

  console.log("productList", productList)

  return (
    <Table striped bordered hover responsive className={styles.customTable}>
      <thead className={styles.customThead}>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {productList && productList?.length > 0 ? 
        productList.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{product.value}</td>
            <td>
              <Button 
                variant='primary'
                style={{
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  marginRight: '5px', 
                  color: userRole === 'admin' || !product.disabled ? 'green' : 'gray'  // Icon color based on role
                }}
                onClick={() => onEdit(product)} 
                disabled={userRole !== 'admin' || product.disabled}
              >
                <MdOutlineModeEdit />
              </Button>
              <Button 
                variant='warning'
                style={{
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  marginRight: '5px', 
                  color: userRole === 'admin' ? 'purple' : 'gray'  // Icon color based on role
                }}
                onClick={() => onDisable(product.id)} 
                disabled={userRole !== 'admin'}
              >
                <FaEye />
              </Button>
              <Button 
                variant='danger'
                style={{
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  marginRight: '5px', 
                  color: userRole === 'admin' || !product.disabled? 'red' : 'gray'  // Icon color based on role
                }}
                onClick={() => onDelete(product.id)} 
                disabled={userRole !== 'admin' || product.disabled}
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        )) : 
        (
          <tr>
            <td colSpan="6" className="text-center">No products available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ProductTable;
