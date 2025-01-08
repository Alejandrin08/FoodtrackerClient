import useMenu from "../../hooks/useMenu";
import CartContext from "../store/cartcontext";
import styles from './DetailsCartCard.module.css';
import React, { useState, useContext, useEffect } from "react";
import DetailsDelivery from "./DetailsDelivery";

const DetailsCard = () => {

  const cartCtx = useContext(CartContext);
  const [name, setName] = useState("");
  const [imageUrl, setImage] = useState("");
  const [location, setLocation] = useState("");
  const idRestaurant = cartCtx.items[0];

  const { getDetailsRestaurant, loading, error } = useMenu(idRestaurant.restaurant || "");


  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const restaurant = await getDetailsRestaurant();
      if (restaurant) {
        setName(restaurant.restaurantName);
        setImage(restaurant.imageUrl);
        setLocation(restaurant.location);
      }
    };

    fetchRestaurantDetails();
  }, [getDetailsRestaurant]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const itemsWithTotal = cartCtx.items.map(item => ({
    ...item,
    totalPrice: item.price * item.amount
  }));

  const totalAmount = itemsWithTotal.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className={`container mt-5 ${styles.appContainer}`}>
      <div className="row">
        <div className="col-md-6">
          <div className={`container mt-5 ${styles.appContainer}`}>
            <div className="row">
              <div className={`card mb-4 ${styles.restaurantHeader}`}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <img src={imageUrl} alt="Imagen del Restaurante" className="img-fluid rounded" />
                    </div>
                    <div className="col-md-8">
                      <h2 className={`card-title ${styles.restaurantName}`}>{name}</h2>
                      <p className="card-text"><i class="fa-solid fa-location-dot"></i>{ location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`card mb-4 ${styles.orderSummary}`}>
            <div className="card-header">
              <h3>Resumen del Pedido</h3>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {itemsWithTotal.map((item, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name}
                    <span
                      className="badge rounded-pill"
                      style={{ backgroundColor: '#ff4d00', color: '#fff' }}
                    >
                      $ {item.price.toFixed(2)}
                    </span>
                    <span
                      className="badge rounded-pill"
                      style={{ backgroundColor: '#ff4d00', color: '#fff' }}
                    >
                      x {item.amount}
                    </span>
                    <span
                      className="badge rounded-pill"
                      style={{ backgroundColor: '#ff4d00', color: '#fff' }}
                    >
                      $ {item.totalPrice.toFixed(2)}
                    </span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                  Subtotal
                  <span>$ {totalAmount.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                  Cargo por servicio
                  <span>$ 13.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center text-muted">
                  Cargo por envío
                  <span>$ 30.00</span>
                </li>
              </ul>

            </div>
            <div className="card-footer">
              <h4 className="text-end">Total: $ {(totalAmount + 13+30).toFixed(2) } </h4>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4">
          <DetailsDelivery />
        </div>

      </div>


    </div>
  );

};



export default DetailsCard;