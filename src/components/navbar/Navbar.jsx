
import './navbar.scss'
import { FiEdit, FiCoffee } from "react-icons/fi";

import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light navbar-light">

                <div class="container-fluid">

                    <NavLink to='/' className={'navbar-brand'}>
                        <a><FiCoffee /> CODIO</a>
                    </NavLink>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <NavLink to='/write' className={'nav-link'}>
                                    <a>WRITE <FiEdit /> </a>
                                </NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink to='/blog' className={'nav-link'}>
                                    <a>BLOGS</a>
                                </NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink to='/login' className={'nav-link'}>
                                    <a>LOGIN</a>
                                </NavLink>
                            </li>

                        </ul>

                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search" />
                            <button class="button" type="submit">SEARCH</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar