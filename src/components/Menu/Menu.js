import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MenuCards from "./MenuCards";
import RestaurantDetailsCard from "../Menu/RestaurantDetailsCard";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import useMenu from "../../hooks/useMenu";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [localData, setLocalData] = useState(null);
    
    // Recuperamos la data del localStorage al cargar el componente
    useEffect(() => {
        const storedData = localStorage.getItem("restaurantData");
        if (storedData) {
            setLocalData(JSON.parse(storedData)); // Convertimos los datos de JSON a objeto
        }
    }, []);

    const { data } = location.state || { data: localData };

    const { loading, error, menu } = useMenu(data?.restaurantName || "");

    useEffect(() => {
        if (data && !localData) {
            // Guardar los datos en el localStorage si no están ya almacenados
            localStorage.setItem("restaurantData", JSON.stringify(data));
        }

        if (!data) {
            navigate("/restaurants"); // Redirigir si no hay datos
        } else {
            window.scrollTo(0, 0);
        }
    }, [data, localData, navigate]);

    if (!data) {
        return null; // Evita renderizar nada hasta redirigir
    }

    return (
        
        <div className="container-sm mt-5">
            <div className="row justify-content-evenly">
                <RestaurantDetailsCard
                    key={data.id}
                    data={data}
                />
            </div>

            <div role="presentation" >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/restaurants">
                        Restaurantes
                    </Link>
                    <div>
                        {data.categoryName}
                    </div>
                    <div>
                        {data.restaurantName}
                    </div>
                </Breadcrumbs>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Divider style={{ backgroundColor: '#ff4d00', height: 4, flex: 1 }} />
                <span style={{ padding: '0 10px', whiteSpace: 'nowrap', fontSize: '25px', fontWeight: 'bold' }}>
                    MENÚ
                </span>
                <Divider style={{ backgroundColor: '#ff4d00', height: 4, flex: 1 }} />
            </div>
            <div className="container-sm mt-5">
                {loading && <p>Cargando menú...</p>}
                {error && <p>{error}</p>}

                {!loading && !error && menu.length === 0 && (
                    <p>No se encontraron platillos para este restaurante.</p>
                )}
            </div>
            <div className="row justify-content-evenly">
                {menu.map((menu) => (
                    <MenuCards
                        key={menu.id}
                        details={menu}
                        restaurantName = {data.restaurantName}
                    />
                ))}
            </div>
        </div>
    );
};

export default Menu;
