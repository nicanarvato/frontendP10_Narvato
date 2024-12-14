import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_ENDPOINT } from './Api';
import {Nav, Navbar, Container, Button, Form, NavDropdown, Row, Col, Card, ListGroup, Modal} from 'react-bootstrap';

function Profile() {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [about, setAbout] = useState([]);
    const [body, setBody] = useState('');
    const [show, setShow] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const [updatedBody, setUpdatedBody] = useState('');
    const navigate = useNavigate();

    const [updateFullname, setUpdateFullname] = useState('');
    const [updateUsername, setUpdateUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userUpdateShow, setUserUpdateShow] = useState(false);
    
    const [currentUserId, setCurrentUserId] = useState(null);

    const handleUserUpdateShow = (user) => {
        setUpdateFullname(user.fullname);
        setUpdateUsername(user.username);
        setPassword(''); // Clear the password for security
        setCurrentUserId(user.user_id); // Save the current user's ID
        setUserUpdateShow(true);
    };

    const handleUserUpdateClose = () => setUserUpdateShow (false);

    const [currentId, setCurrentId] = useState(null);
    
    const [updateShow, setUpdateShow] = useState(false);

    const handleUpdateClose = () => setUpdateShow(false);

    const handleUpdateShow = (id, body) => {
        setCurrentId(id);
        setUpdatedBody(body);
        setUpdateShow(true);
    };
    
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


    const handleUpdateUser = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`${API_ENDPOINT}/user/${currentUserId}`, { fullname: updateFullname, username: updateUsername, password }, { headers });
            Swal.fire({ icon: 'success', text: 'Successfully Updated' });
            setUpdateShow(false);
            fetchAboutSelf(); 
        } catch (error) {
            console.error('Error updating about self:', error);
            Swal.fire({ icon: 'error', text: error.response?.data?.message || 'Error occurred while updating about self.' });
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

    // Update about_self
    const handleUpdateAboutSelf = async (e) => {
        e.preventDefault();
        if (!updatedBody.trim()) {
            Swal.fire({ icon: 'error', text: 'Body content cannot be empty.' });
            return;
        }
        try {
            await axios.put(`${API_ENDPOINT}/aboutself/${currentId}`, { body: updatedBody }, { headers });
            Swal.fire({ icon: 'success', text: 'Successfully Updated' });
            setUpdateShow(false);
            fetchAboutSelf(); 
        } catch (error) {
            console.error('Error updating about self:', error);
            Swal.fire({ icon: 'error', text: error.response?.data?.message || 'Error occurred while updating about self.' });
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

            <Modal show={userUpdateShow} onHide={handleUserUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateUser}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Full Name"
                                value={updateFullname}
                                onChange={(e) => setUpdateFullname(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={updateUsername}
                                onChange={(e) => setUpdateUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter New Password (if changing)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleUserUpdateClose}>
            Close
        </Button>
    </Modal.Footer>
</Modal>

<Modal show={updateShow} onHide={handleUpdateClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Health Characteristics</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateAboutSelf}>
                                    <Form.Group className="mt-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Update health characteristics"
                                            value={updatedBody}
                                            onChange={(e) => setUpdatedBody(e.target.value)}
                                        />
                                        {validationError && <p className="text-danger">{validationError}</p>}
                                    </Form.Group>
                                    <Button className="mt-2" type="submit">
                                     Save Changes
                                    </Button>
                                </Form></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>

            <Container className="mt-4">
                <Row>
                    <Col lg={6} md={12} sm={12}>
                        <Card>
                            <Card.Body>
                                <h5>User Details</h5>
                                {users.length > 0 ? (
                                    <ListGroup>
                                        {users.map((u) => (
                                            <ListGroup.Item key={u.user_id}>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item>
                                                    UserID: {u.user_id}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                    Username: {u.username}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                    Name: {u.fullname}
                                                    </ListGroup.Item>
                                                    <Button 
                                                    variant="success" 
                                                    onClick={() => handleUserUpdateShow(u)}>
                                                    Edit User
                                                    </Button>
                                                    </ListGroup>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p>No user data available.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                        <Card>
                            <Card.Body>
                                
                                <table className='table table-bordered'>
                                    <thead>
                                    <th style={{padding: 1, margin:0}}>Item No.</th>
                                    <th style={{padding: 1, margin:0}}>Health Characteristics</th>
                                    <th style={{padding: 1, margin:0}}>Action</th>
                                    </thead>

                                    <tbody>
                                        {
                                            about.length > 0 && (
                                                about.map((a, key)=>(
                                                    <tr key={a.id}>
                                                        <td style={{padding: 1, margin:0}}>{a.id}</td>
                                                        <td style={{padding: 1, margin:0}}>{a.body}</td>
                                                        <td style={{padding: 1, margin:0}}> 
                                                            <Button className='g-2' variant="danger" onClick={() => handleDeleteAboutSelf(a.id)}>
                                                                Delete
                                                            </Button>
                                                            <Button variant="success" onClick={() => handleUpdateShow(a.id, a.body)}>
                                                                Edit
                                                            </Button> 
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                </table>
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
