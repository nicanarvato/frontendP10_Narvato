import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_ENDPOINT } from './Api';
import {Nav, Navbar, Container, Button, Form, NavDropdown, Row, Col, Card, ListGroup} from 'react-bootstrap';

function Profile() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [about, setAbout] = useState([]);
    const [body, setBody] = useState('');
    const [show, setShow] = useState(false);
    const [validationError, setValidationError] = useState(null);

    const navigate = useNavigate();

    // Decode token and set user
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const parsedToken = JSON.parse(token);
                const decoded = jwtDecode(parsedToken.data.token);
                setUser(decoded);
            } catch (error) {
                console.error('Invalid token:', error);
                navigate('/HomePage');
            }
        } else {
            navigate('/HomePage');
        }
    }, [navigate]);

    // Header configuration
    const token = JSON.parse(localStorage.getItem('token'))?.data?.token || '';
    const headers = {
        Accept: 'application/json',
        Authorization: token,
    };

    // Fetch user data
    const fetchUserData = async () => {
        try {
            const { data } = await axios.get(`${API_ENDPOINT}/user/account`, { headers });
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Fetch about_self data
    const fetchAboutSelf = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/aboutself`, { headers });
            const data = response.data;
            if (Array.isArray(data)) {
                setAbout(data);
            } else if (data && typeof data === 'object') {
                setAbout([data]);
            } else {
                console.warn("Unexpected response format:", data);
                setAbout([]);
            }
        } catch (error) {
            console.error("Error fetching about self:", error.message);
            setAbout([]);
        }
    };
    
    
    // Add about_self entry
    const handleAddAboutSelf = async (e) => {
        e.preventDefault();
        if (!body.trim()) {
            setValidationError('Body content is required.');
            return;
        }
        const formData = new FormData();
        formData.append('body', body);
    
        try {
            await axios.post(`${API_ENDPOINT}/aboutself`, { body }, { headers });
            Swal.fire({ icon: 'success', text: 'Successfully Added' });
            setBody('');
            fetchAboutSelf();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Error occurred while adding about self.',
            });
        }
    };
    

    // Delete about_self entry
    const handleDeleteAboutSelf = async (id) => {
        try {
            await axios.delete(`${API_ENDPOINT}/aboutself/${id}`, { headers });
            Swal.fire({ icon: 'success', text: 'Successfully Removed' });
            fetchAboutSelf();
        } catch (error) {
            console.error('Error deleting about self:', error);
            Swal.fire({ icon: 'error', text: error.response?.data?.message || 'Error occurred' });
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchUserData();
        fetchAboutSelf();
    }, []);

    return (
        <div>
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
                            <NavDropdown title={user ? `User: ${user.username}` : 'Dropdown'} id="basic-nav-dropdown" align="end">
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h5>User Details</h5>
                                {users.length > 0 ? (
                                    <ListGroup>
                                        {users.map((u) => (
                                            <ListGroup.Item key={u.user_id}>
                                                <Row>
                                                    <Col>UserID: {u.user_id}</Col>
                                                    <Col>Username: {u.username}</Col>
                                                    <Col>Name: {u.fullname}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p>No user data available.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <h5>About Self</h5>
                                {about.length > 0 ? (
                                    <ListGroup>
                                    {about.map((a) => (
                                        <ListGroup.Item key={a.id}> {/* Add key here */}
                                            <Row>
                                                <Col>About ID: {a.id}</Col>
                                                <Col>{a.body}</Col>
                                            </Row>
                                            <Button variant="danger" onClick={() => handleDeleteAboutSelf(a.id)}>
                                                Delete
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                ) : (
                                    <p>No about self data available.</p>
                                )}
                                <Form onSubmit={handleAddAboutSelf}>
                                    <Form.Group className="mt-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Add About Self"
                                            value={body}
                                            onChange={(e) => setBody(e.target.value)}
                                        />
                                        {validationError && <p className="text-danger">{validationError}</p>}
                                    </Form.Group>
                                    <Button className="mt-2" type="submit">
                                        Add
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Profile;
