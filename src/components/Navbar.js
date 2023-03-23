import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isToggle, setIsToggle] = useState(false)

    const showNavbar = () => {
        setIsToggle(!isToggle)
    }

    return (
        <>
            <header className='header'>
                <div className='site-logo'>
                    Portofoliu Test
                </div>
                <nav className={isToggle ? 'nav-links responsive' : 'nav-links'}>
                    <Link to="/" className={isToggle ? 'links responsive' : 'links'}>Portofolio</Link>
                    <Link to="/create" className={isToggle ? 'links responsive' : 'links'}>Add new project</Link>
                    <button className='nav-btn' onClick={showNavbar}>
                        <FaBars />
                    </button>
                </nav>


            </header>
        </>
    )
}


export default Navbar;