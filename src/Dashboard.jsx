import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import { Nav, Navbar, Container, Button, Form, NavDropdown, Row, Col, Card, Carousel } from 'react-bootstrap';

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDecodedUserID = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                // const parsedToken = JSON.parse(token);
                // const decodedToken = jwtDecode(parsedToken);
                // setUser(decodedToken);
            } catch (error) {
                console.error('Token error:', error);
                navigate("/HomePage");
            }
        };

        fetchDecodedUserID();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            navigate("/login");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar bg="primary" variant="dark" expand="lg" className="py-3">
                <Container>
                    <Navbar.Brand href="#home">TruMedsRX</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-content" />
                    <Navbar.Collapse id="navbar-content">
                        <Form className="d-flex mx-auto">
                            <Form.Control
                                type="search"
                                placeholder="Search for Branded or Generic Medicine"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        <Nav className="ms-auto">
                            <NavDropdown title={user ? `User: ${user.username}` : 'Account'} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Categories Section */}
            {/* <div className="bg-danger text-white py-2">
                <Container>
                    <Navbar>
                    <Nav className="justify-content-center">
                        <Nav.Link href="#" className="text-white">TruMedsRX Pharmacy </Nav.Link>
                        <Nav.Link href="#" className="text-white">Pharmacy</Nav.Link>
                        <Nav.Link href="#" className="text-white">Health Care</Nav.Link>
                        <Nav.Link href="#" className="text-white">Beauty</Nav.Link>
                        <Nav.Link href="#" className="text-white">Personal Care</Nav.Link>
                        <Nav.Link href="#" className="text-white">Baby & Kids</Nav.Link>
                        <Nav.Link href="#" className="text-warning">SALE</Nav.Link>
                    </Nav>
                    </Navbar>
                </Container>
            </div> */}

            {/* Main Banner (Carousel) */}
            <Container className="mt-4">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1200x400" // Replace with your banner image
                            alt="Mega Christmas Sale"
                        />
                        <Carousel.Caption>
                            <h3>Mega Christmas Sale</h3>
                            <p>Shop now for amazing discounts on a wide range of products!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Footer or additional content can go here */}
        </div>
    );
}

export default Dashboard;