import './navbar.scss'
import { FiEdit, FiCoffee } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { auth } from '../../firebase';

const Navbar = () => {


    const authCtx = useContext(AuthContext)

    // console.log(authCtx.userId )
    // console.log(authCtx.isAuthenticated)

    const handleLogOut = () => {
        authCtx.logout()
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navbar-light">

                <div className="container-fluid">

                    <NavLink to='/' className={'navbar-brand'}>
                        <a><FiCoffee /> CODIO</a>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search by title..." aria-label="Search" value={title} onChange={ (e) => setTitle(e.target.value) }/>
                        <button className="button" type="submit" onClick={handleSearch} >SEARCH</button>
                    </form> */}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {authCtx.isAuthenticated && authCtx.userId && <li className="nav-item">
                                <NavLink to='/write' className={'nav-link'}>
                                    WRITE <FiEdit />
                                </NavLink>
                            </li>}

                            {authCtx.isAuthenticated && authCtx.userId && <li className="nav-item">
                                <NavLink to={'/users/' + authCtx.userId} className={'nav-link'}>
                                    PROFILE
                                </NavLink>
                            </li>}

                            {!authCtx.isAuthenticated && <li className="nav-item"><NavLink to='/login' className={'nav-link'}>LOGIN</NavLink></li>}

                            {authCtx.isAuthenticated && authCtx.userId && <li className="nav-item" onClick={handleLogOut}><NavLink to='/login' className={'nav-link'}>LOGOUT</NavLink></li>}
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar