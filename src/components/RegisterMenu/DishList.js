import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import styles from './RegisterMenu.module.css';

const DishList = ({ menu, onRemoveDish }) => {
  return (
    <div className={styles.dishList}>
      <h2>Platillos en el Menú</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
      {menu.map((item) => (
          <Col key={item.id}>
            <Card className={styles.dishCard}>
              {item.imageUrl && (
                <Card.Img variant="top" src={item.imageUrl} alt={item.dish} className={styles.dishImage} />
              )}
              <Card.Body>
                <Card.Title>{item.dish}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> ${item.price}
                </Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Button 
                  variant="danger" 
                  onClick={() => onRemoveDish(item.dish)}
                  className={styles.removeButton}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DishList;

