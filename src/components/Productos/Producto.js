import React from 'react';
import {useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

// Redux
import {useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../../actions/productosActions';

const Producto = ({producto}) => {

    const {nombre, precio, id} = producto;
    
    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar history para redireccion

    // confirmar si desea eliminar
    const confirmarEliminarProducto = id => {

        Swal.fire({
            title: 'Estas seguro?',
            text: "El producto no se podrá recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.value) {
                dispatch( borrarProductoAction(id) );
            }
          })
        

        
    }


    // funcion para redirigir de forma programada
    const redirectEdicion = producto =>{
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`)
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">${precio}</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redirectEdicion(producto) }
                    className="btn btn-primary mr-2 nuevo-post">
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger nuevo-post"
                    onClick={ () => confirmarEliminarProducto(id) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Producto;