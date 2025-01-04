import React from "react";
import KitchenSinkExample from "../Order/DetailsCartCard";
import KitchenSinkExample2 from "../Order/DetailsDelivery";
const Order = () => {

    return (

        <div className="container-sm mt-5">
            <div className="row justify-content-evenly">
                <KitchenSinkExample
                />
                <KitchenSinkExample2
                />
            </div>


        </div>
    );
};

export default Order;
