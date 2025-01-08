import React, { useContext, useState } from 'react';
import styles from './DetailsDelivery.module.css';
import MapSection from "./AddressMap";
import Swal from "sweetalert2";
import CartContext from "../store/cartcontext";

const DetailsDelivery = () => {
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const [addressSelected, setAddressSelected] = useState(false);
  const cartCtx = useContext(CartContext);
  const nameRestaurant = cartCtx.items[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("rating", nameRestaurant.nameRestaurant);
    Swal.fire({
      title: "Pedido realizado con éxito",
      text: "El restaurante te enviará tu pedido lo mas pronto posible.",
      icon: "success",
    }).then(() => {
      window.location.replace("/");
    });

  };

  const handleAddressChange = (isSelected) => {
    setAddressSelected(isSelected);
  };

  return (
    <div className={`container mt-5 ${styles.appContainer}`}>
      <div className={`card mb-4 ${styles.deliveryDetails}`}>
        <div className="card-header">
          <h3>Detalles de Entrega</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <MapSection onAddressChange={handleAddressChange}></MapSection>

            </div>

            <div className="mb-3">
              <label className="form-label d-block">Forma de Pago</label>
              <div className={`btn-group ${styles.paymentOptions}`} role="group" aria-label="Forma de pago">
                <input
                  type="radio"
                  className="btn-check"
                  name="formaPago"
                  id="tarjeta"
                  value="tarjeta"

                  checked={paymentMethod === 'tarjeta'}
                  onChange={() => setPaymentMethod('tarjeta')}
                />
                <label className={`btn btn-outline-primary ${styles.paymentButton} `} style={{
                  backgroundColor: paymentMethod === 'tarjeta' ? '#ff4d00' : '',
                  color: paymentMethod === 'tarjeta' ? 'white' : 'black',
                  borderColor: paymentMethod === 'tarjeta' ? '#ff4d00' : '#cccccc'
                }} htmlFor="tarjeta">
                  Tarjeta
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="formaPago"
                  id="efectivo"
                  value="efectivo"
                  checked={paymentMethod === 'efectivo'}
                  onChange={() => setPaymentMethod('efectivo')}
                />
                <label className={`btn btn-outline-primary ${styles.paymentButton} `} style={{
                  backgroundColor: paymentMethod === 'efectivo' ? '#ff4d00' : '',
                  color: paymentMethod === 'efectivo' ? 'white' : 'black',
                  borderColor: paymentMethod === 'efectivo' ? '#ff4d00' : '#cccccc'
                }} htmlFor="efectivo">
                  Efectivo
                </label>
              </div>
            </div>
            <button type="submit" style={{ backgroundColor: '#ff4d00', color: '#fff' }} className={`btn  w-100 ${styles.submitButton}`} disabled={!addressSelected}>Realizar Pedido</button>
          </form>
        </div>
      </div>
    </div >
  );
}

export default DetailsDelivery;