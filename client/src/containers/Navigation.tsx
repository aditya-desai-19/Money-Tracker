import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './styles/Navigation.css';

const Navigation: React.FC = () => {

    return (
        <Navbar expand="md" data-bs-theme="light" fixed='top' className='navigationContainer'>
            <Navbar.Brand as={Link} to={"/"} className='mx-auto text-white'>Expense Tracker</Navbar.Brand>
        </Navbar>
    )
}

export default Navigation;