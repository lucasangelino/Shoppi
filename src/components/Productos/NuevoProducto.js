import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions de Redux
import { crearNuevoProductoAction} from '../../actions/productosActions';
import { mostrarAlerta, ocultarAlerta } from '../../actions/alertaActions';


const NuevoProducto = ({history}) => {

    // state local del componente
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    // utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    // acceder al state del store
    const cargando = useSelector( state => state.productos.loading );
    const error = useSelector( state => state.productos.error );
    const alerta = useSelector( state => state.alerta.alerta);

    // para llamar a la funcion de crearNuevoProductoAction
    const agregarProducto = producto =>{
        dispatch(crearNuevoProductoAction(producto))
    }

    // cuando se haga submit
    const submitNuevoProducto = e =>{
        e.preventDefault();

        // validar form
        if(nombre.trim() === '' || precio <= 0){
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                clases: 'alert alert-danger text-center p3'
            }
            dispatch( mostrarAlerta(alerta) );
            return;
        }

        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        history.push('/');
    }

    const handleChangeNombre = e => {
        guardarNombre(e.target.value);
    }

    const handleChangePrecio = e =>{
        guardarPrecio(Number(e.target.value));
    }

    const handleFocus = () => {
        dispatch( ocultarAlerta() );
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card border-primary">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        { alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null }

                        <form
                            onSubmit={submitNuevoProducto}                        
                        >
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={handleChangeNombre}
                                    onFocus={handleFocus}
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
                                    onChange={handleChangePrecio}
                                    onFocus={handleFocus}
                                />                                
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary font-weight-bold d-block w-100 nuevo-post">
                                    Agregar
                                </button>

                        </form>
                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 my-2">Intenta nuevamente</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevoProducto;