import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

// Redux
import { editarProductoAction } from '../../actions/productosActions';

const EditarProducto = () => {

    const history = useHistory();

    const dispatch = useDispatch();

    // State de producto local
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: ''
    });

    // producto a editar
    const productoeditar = useSelector( state => state.productos.productoeditar);

    const {nombre, precio} = producto;

    const handleSubmit = e => {
        e.preventDefault();

        // validar el form
        // if (nombre === '' || precio === '') return;


        dispatch(editarProductoAction(producto));
        history.push('/');
    }

    useEffect( ()=> {
        guardarProducto(productoeditar);
    }, [productoeditar]);

    // guardar datos del formulario
    const handleChange = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        });
    } 

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card border-primary">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar producto
                        </h2>

                        <form
                            onSubmit={handleSubmit}                        
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChange}
                                />                                
                            </div>

                            <div className="form-group">
                                <label>Precio producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    value={precio}
                                    onChange={handleChange}
                                />                                
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold d-block w-100 nuevo-post">
                                    Guardar cambios
                                </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;