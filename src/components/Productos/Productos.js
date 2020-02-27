import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from '../../actions/productosActions';
import Producto from './Producto';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        // consultar API
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();
        // eslint-disable-next-line
    },[]);

    // obtengo el state del store
    const productos = useSelector( state => state.productos.productos );
    const error = useSelector( state => state.productos.error);
    const cargando = useSelector( state => state.productos.loading);


    return (
        <Fragment>
            <h2 className="text-center my-5">
                Productos
            </h2>
            { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
            { cargando ? <p className="text-center">Cargando</p> : null }
            <table className="table table-primary">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? 
                        <p>No hay productos</p> 
                        : (
                            productos.map( producto => {
                                return(
                                    <Producto
                                        key={producto.id}
                                        producto={producto}
                                    />
                                )
                            })
                        )}
                </tbody>
                

            </table>
        </Fragment>
    );
};

export default Productos;