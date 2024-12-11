import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from './Api';
import { Container, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Registration() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
                fullname,
                username,
                password,
            });
        setLoading(false)
            await Swal.fire({
                title: "Register Success!",
                icon: "success"
              });

        } catch (error) {

            setLoading(false)
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              }); 

            setError('There is an error processing your request');
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container fluid>
                <Row className="h-100">
                    {/* Image Column */}
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <img src="/med.jpg" alt="Medicine" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Col>

                    {/* Form Column */}
                    <Col
                        md={6}
                        className="d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: '#f8f9fa' }}
                    >
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <h3 className="mb-4 text-center">Sign Up Now</h3>
                            <Form onSubmit={handleSubmit}>
                                {/* Fullname */}
                                <Form.Group controlId="formFullname" className="mb-3">
                                    <Form.Label>Fullname</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Fullname"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Username */}
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Password */}
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Error Message */}
                                {error && <p style={{ color: 'red' }}>{error}</p>}

                                {/* Submit Button */}
                                <Button type="submit" className="w-100" style={{ 
                                    backgroundColor: '#007bff', 
                                    border: 'none' }}
                                    disabled={loading} // Disable the button while loading
            >
                {loading ? ( // Show spinner if loading
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> Loading...
                    </>
                ) : (
                    "Register"
                )}
                                </Button>
                                <Button href='/homepage' variant="secondary" className='w-100 mt-3'>Go Back</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Registration;
