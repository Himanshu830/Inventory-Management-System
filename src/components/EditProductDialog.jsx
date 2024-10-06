import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import React-Bootstrap components

const EditProductDialog = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formProductName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group controlId="formProductQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSave(updatedProduct)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductDialog;
