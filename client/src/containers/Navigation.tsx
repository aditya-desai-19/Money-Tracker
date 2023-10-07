import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styles from './styles/Navigation.module.css';

const Navigation: React.FC = () => (
    <Navbar expand="md" data-bs-theme="light" fixed='top' className={styles.navigationContainer}>
        <Navbar.Brand as={Link} to={"/"} className='mx-auto text-white'>Money Tracker</Navbar.Brand>
    </Navbar>
)

export default Navigation;