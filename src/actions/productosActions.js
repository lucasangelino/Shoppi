import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

// crear nuevos productos

export function crearNuevoProductoAction(producto){
    return async(dispatch) =>{
        dispatch( agregarProducto() );
        try {
            // insertar en la API
            await clienteAxios.post('/productos', producto);
            // si tiene exito
            dispatch( agregarProductoExito(producto) );
            Swal.fire(
                'Shoppi',
                'El producto se agrego correctamente',
                'success'
            )
        } catch (error) {
            console.log(error);
            // si tiene error
            dispatch( agregarProductoError(true) );
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Hubo un error!',
            })
        }

    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

// si se guarda exitosamente
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hubo un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// descargar productos del server
export function obtenerProductosAction(){
    return async(dispatch) => {
        dispatch( descargarProductos() );

        try {
            const res = await clienteAxios.get('/productos');
            dispatch( descargarProductosExitosa(res.data) );
        } catch (error) {
            console.log(error);
            dispatch( descargarProductosError() );
        }
    }
}

const descargarProductosExitosa = productos => {
    return{
        type: DESCARGA_PRODUCTOS_EXITO,
        payload: productos
    }
};

const descargarProductosError = () => {
    return{
        type: DESCARGA_PRODUCTOS_ERROR,
        payload: true
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch( obtenerProductoEliminar(id) );
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito() );
            // si confirma eliminar
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente',
                'success'
              )
        } catch (error) {
            dispatch( eliminarProductoError() );
        }
    }
}

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
});

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
});

// colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoAction(producto) );
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch( editarProducto() );
    try {
        await clienteAxios.put(`/productos/${producto.id}`, producto);
        dispatch( editarProductoExito(producto));
    } catch (error) {
        dispatch( editarProductoError() );
    }
    }
}

const editarProductoError = () =>({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto =>({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});

