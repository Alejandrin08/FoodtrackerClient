import React, { useEffect, useState } from "react";
import DishList from './DishListMenu';
import Divider from '@mui/material/Divider';
import useMenu from "../../hooks/useMenu";
import useRestaurant from "../../hooks/useRestaurant";
import Swal from "sweetalert2";
import useEditMenu from "../../hooks/useEditMenu";
import DishModal from './DishModal';
import useRegisterMenu from "../../hooks/useRegisterMenu";

const Menu = () => {

    
    const [dishList, setDishList] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [dishToEdit, setDishToEdit] = useState(null);
    const [newDishEdit, setNewDishEdit] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    const { getRestaurant } = useRestaurant();
    const { deleteDishFromMenu, editDishFromMenu } = useEditMenu();

    const { register } = useRegisterMenu();
    const [restaurantName, setRestaurantName] = useState("");
    const [dish, setDish] = useState({
        dish: '',
        price: '',
        imageUrl: '',
        description: ''
    });

    useEffect(() => {
        const fetchRestaurantName = async () => {
            const { success, restaurant } = await getRestaurant();
            if (success && restaurant) {
                setRestaurantName(restaurant.restaurantName);
            }
        };
    
        fetchRestaurantName();
    }, []);
    
    const { loading, error, menu } = useMenu(restaurantName || "");
    
    useEffect(() => {
        if (!loading && !error) {
            setDishList(menu);
        }
    }, [loading, error, menu]);

    const checkForChanges = (updatedDish) => {
        const hasChanges = Object.keys(updatedDish).some(key =>
            updatedDish[key] !== dishToEdit[key]
        );
        setHasChanges(hasChanges);
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        const updatedDishEdit = { ...newDishEdit, [name]: value };
        setNewDishEdit(updatedDishEdit);
        checkForChanges(updatedDishEdit);
    };

    const editDish = (item) => {
        setDishToEdit(item);
        setNewDishEdit(item)
        setShowModalEdit(true);
        setHasChanges(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dishToEdit.dish !== newDishEdit.dish) {
            const isDishExist = dishList.some(item => item.dish.toLowerCase() === newDishEdit.dish.toLowerCase());
            if (isDishExist) {
                closeModalEdit();
                Swal.fire({
                    title: "Aviso",
                    text: `Ya existe un platillo con el nombre "${newDishEdit.dish}". No puede repetir platillos.`,
                    icon: "warning"
                });
            } else {
                const resultEditDishAll = await editDishFromMenu(dishToEdit.dish, newDishEdit);

                if (!resultEditDishAll.success) {
                    closeModalEdit();
                    Swal.fire({
                        title: "Error",
                        text: `No se pudo editar el platillo "${dishToEdit.dish}".`,
                        icon: "error"
                    });
                } else {
                    const updatedList = dishList.map(item =>
                        item.dish.toLowerCase() === dishToEdit.dish.toLowerCase()
                            ? { ...item, ...newDishEdit }
                            : item
                    );
                    setDishList(updatedList);
                    closeModalEdit();
                    editSuccess();
                }
            }
        } else {
            const resultEditDish = await editDishFromMenu(dishToEdit.dish, newDishEdit);

            if (!resultEditDish.success) {
                closeModalEdit();
                Swal.fire({
                    title: "Error",
                    text: `No se pudo editar el platillo "${dishToEdit.dish}".`,
                    icon: "error"
                });
            } else {
                const updateDishInList = dishList.map(item =>
                    item.dish.toLowerCase() === dishToEdit.dish.toLowerCase()
                        ? { ...item, price: newDishEdit.price, imageUrl: newDishEdit.imageUrl, description: newDishEdit.description }
                        : item
                )
                setDishList(updateDishInList);
                closeModalEdit();
                editSuccess();
            }
        }
    };

    const editSuccess = () => {
        Swal.fire({
            title: "Aviso",
            text: `Se modifico correctamente el platillo ${newDishEdit.dish}.`,
            icon: "success"
        });
    }

    const addDish = async (e) => {
        e.preventDefault(); 
        const isDishExist = dishList.some(item => item.dish.toLowerCase() === dish.dish.toLowerCase());
        if (isDishExist) {
            closeModalAdd();
            Swal.fire({
                title: "Aviso",
                text: `Ya existe un platillo con el nombre "${dish.dish}". No puede repetir platillos.`,
                icon: "warning"
            });
        } else {
            setDishList([...dishList, { ...dish }]);
            try {
                const resultRegisterDish = await register(dish);
                closeModalAdd();
                if (!resultRegisterDish.success) {
                    Swal.fire({
                        title: "Error",
                        text: `No se pudo registrar el platillo "${dish.dish}".`,
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Éxito",
                        text: "El platillo se registro exitosamente.",
                        icon: "success"
                    });
                    setDish({ dish: '', price: '', imageUrl: '', description: '' });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error inesperado al registra el platillo.",
                    icon: "error"
                });
            }

        }

    }

    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setDish({ ...dish, [name]: value });
    };

    const newDish = () => {
        setShowModalAdd(true);
    }

    const closeModalAdd = () => {
        setShowModalAdd(false);
        setDish({ dish: '', price: '', imageUrl: '', description: '' });
    };


    const removeDish = (name) => {
        handleDeleteDish(name)
    };

    const closeModalEdit = () => {
        setShowModalEdit(false);
    };

    const handleDeleteDish = async (name) => {
        try {

            const resultRegisterDish = await deleteDishFromMenu(name);
            console.log(resultRegisterDish);

            if (!resultRegisterDish.success) {
                Swal.fire({
                    title: "Error",
                    text: `No se pudo eliminar el platillo "${name}".`,
                    icon: "error"
                });
            } else {
                Swal.fire({
                    title: "Éxito",
                    text: `El platillo ${name} eliminado exitosamente.`,
                    icon: "success"
                });
                setDishList(dishList.filter(dish => dish.dish !== name));
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `Ocurrió un error inesperado al eliminar el platillo ${name}.`,
                icon: "error"
            });
        }
    }

    return (
        <>
            <DishModal
                show={showModalEdit}
                onClose={closeModalEdit}
                dishData={newDishEdit}
                onChange={handleChangeEdit}
                onSubmit={handleSubmit}
                title="Editar platillo"
                hasChanges={hasChanges}
            />

            <DishModal
                show={showModalAdd}
                onClose={closeModalAdd}
                dishData={dish}
                onChange={handleChangeAdd}
                onSubmit={addDish}
                title="Agregar platillo"
                hasChanges={!hasChanges}
            />


            <div className="container-sm mt-5">
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
                    <DishList
                        menu={dishList}
                        onRemoveDish={removeDish}
                        onEditDish={editDish}
                        onNewDish={newDish}
                    />
                </div>
            </div>
        </>
    );
};

export default Menu;
