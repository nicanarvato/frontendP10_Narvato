import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from './Api';
import { Navbar, Container, Button, Form, Row, Col, Nav, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BackgroundImage from './assets/medicine-capsule-showing-active-ingredients.webp';

function Registration() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/register`, {
                fullname,
                username,
                password,
            });
        } catch (error) {
            setError('There is an error processing your request');
        }
    };

    return (
        <div 
            style={{ 
                height: '100vh',
                width: '100vw',
                display: "flex",
            }}
        >
            {/* Register Form */}
            <Container style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Col>
                    <img src='/med.jpg' style={{ width:"350px", height: '300px' }} 
                    alt="Medicine"></img>
                    </Col>
                    <Col>
                        <div>
                          <Form onSubmit={handleSubmit} style={{ width: "350px", backgroundColor: "#fff", borderRadius: "10px" }}>
                            <Form.Group controlId="formUsername">
                             <Form.Label>Fullname</Form.Label>
                                <Form.Control
                                  className="form-control-sm rounded-0"
                                  type="text"
                                  placeholder="Fullname"
                                  value={fullname}
                                  onChange={(e) => setFullname(e.target.value)}
                                  required
                                  />
                                    </Form.Group>            

                                    {/* Username */}
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                className="form-control-sm rounded-0"
                                                type="text"
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                    </Form.Group>

                                    <br />

                                    {/* Password */}
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                className="form-control-sm rounded-0"
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                    </Form.Group>

                                    <br />

                                    <br />

                                    {/* Error Message */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                    <Form.Group controlId="formButton" className="text-center">
                                        <Button 
                                            type="submit" 
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                            }}
                                        >Register</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                    </Col>
                </Row>
                </Container>
            
        </div>
    );
}

export default Registration;
