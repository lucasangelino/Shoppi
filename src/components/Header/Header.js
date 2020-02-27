import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-context-between">
            <div className="container">
                <Link to={'/'} className="text-light">
                    Shop admin
                </Link>
            </div>

            <Link to={'/productos/nuevo'}
                className="btn btn-danger nuevo-post d-block d-md-inline-block"
                href="/productos/nuevo"
            > 
                Agregar producto &#43;
                
            </Link>

        </nav>
    );
};

export default Header;