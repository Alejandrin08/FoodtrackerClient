import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import TheButton from '../Ui/TheButton';

const categories = [
  { name: 'Pizzas', icon: 'fa-pizza-slice' },
  { name: 'Hamburgesas', icon: 'fa-burger' },
  { name: 'Mariscos', icon: 'fa-shrimp' },
  { name: 'Comida Mexicana', icon: 'fa-pepper-hot' },
];

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Categoría</Form.Label>
      <Row>
        {categories.map((category) => (
          <Col key={category.name} xs={6} md={3} className="mb-2">
            <TheButton
              className="w-100 d-flex flex-column align-items-center justify-content-center py-3"
              onClick={() => onSelectCategory(category.name)}
              style={{
                backgroundColor: selectedCategory === category.name ? 'var(--primaryitemcolor)' : 'var(--primarybackground)', 
                borderColor: selectedCategory === category.name ? 'var(--primaryitemcolor)' : 'var(--primaryitemcolor)', 
                color: selectedCategory === category.name ? 'var(--light)' : 'var(--primarytextcolor)', 
              }}
            >
              <i 
                className={`fa ${category.icon}`} 
                style={{
                  fontSize: '24px',
                  color: selectedCategory === category.name ? 'var(--light)' : 'var(--primaryitemcolor)', 
                }}
              ></i>
              <span className="mt-2">{category.name}</span>
            </TheButton>
          </Col>
        ))}
      </Row>
    </Form.Group>
  );
}
