
import React, { useState } from 'react';
import ProductTable from './ProductTable';
import EditProductDialog from './EditProductDialog';
import { useRecoilState } from 'recoil';
import { productListState } from '../recoil/atoms';

const AdminView = () => {
  const [products, setProducts] = useRecoilState(productListState);
  const [editProduct, setEditProduct] = useState(null);

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleDisable = (id) => {
    setProducts(products.map(product => product.id === id ? { ...product, disabled : !product.disabled } : product));
  };
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(product => 
      product.id === updatedProduct.id 
        ? { 
            ...product, 
            price: parseFloat(String(updatedProduct.price ?? product.price)?.replace(/[^\d.-]/g, '')) || 0,
            quantity: (updatedProduct.quantity ?? product.quantity) || 0, // Update quantity
            value: '$' + (
              (parseFloat(String(updatedProduct.price ?? product.price)?.replace(/[^\d.-]/g, '')) || 0) * 
              ((updatedProduct.quantity ?? product.quantity) || 0)
            ).toFixed(2)
          }
        : product
    ));
    setEditProduct(null); 
  };

  return (
    <div>
      <ProductTable onEdit={handleEdit} onDelete={handleDelete} onDisable={handleDisable} />
      {editProduct && (
        <EditProductDialog product={editProduct} onClose={() => setEditProduct(null)} onSave={handleUpdateProduct} />
      )}
    </div>
  );
};

export default AdminView;
                