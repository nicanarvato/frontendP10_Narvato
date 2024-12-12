import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINT } from './Api';
import { Navbar, Container, Button, Form, Row, Col, Nav, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BackgroundImage from './assets/medicine-capsule-showing-active-ingredients.webp';
import Swal from 'sweetalert2';
function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'));
                setUser(response.data);
                navigate("/dashboard");
            } catch (error) {
                localStorage.removeItem('token');
                navigate("/login");
            }
        };
        fetchUser();
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
                username,
                password,
            });
            localStorage.setItem("token", JSON.stringify(response));
        setError('');
        setLoading(false)
        await Swal.fire({
            title: "Login Success!",
            icon: "success"
            });

            navigate("/dashboard");
        } catch (error) {
            setLoading(false)
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message
              }); 
            setError('Invalid username or password');
        }
    };

    return (
        <div 
            style={{ 
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                Height: '100vh',
                Width: '100vw',
                display: "flex",
                flexDirection: 'column'
            }}
        >
            {/* Navbar */}
            <Navbar bg="primary">
  <Container>
    <Navbar.Brand href="#" style={{ fontFamily: "fantasy" }}>TruMedsRX</Navbar.Brand>
    {/* Left-aligned Nav items */}
    <Nav className="me-auto"> {/* "me-auto" aligns items to the left */}
        <Button variant="primary" as={Link} to="/homepage">Home</Button>
        <Button variant="primary" as={Link} to="/homepage">About</Button>
    </Nav>
  </Container>
</Navbar>
            {/* Login Form */}
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Row className="justify-content-md-center">
                    <Col>
                        <div className="container">
                            <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Form onSubmit={handleSubmit} style={{ width: "350px", marginTop: "20px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
                                    <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Login to TruMedsRX</h3>
                                    
                                    {/* Username */}
                                    <Form.Group controlId="formUsername"style={{ textAlign: "left" }}>
                                        <Form.Label>Username *</Form.Label>
                                        <div>
                                            <Form.Control
                                                className="form-control-sm rounded-0"
                                                type="text"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                required
                                            />
                                            <Link to="#" style={{ fontSize: "12px" }}>Forgot username?</Link>
                                        </div>
                                    </Form.Group>

                                    <br />

                                    {/* Password */}
                                    <Form.Group controlId="formPassword"style={{ textAlign: "left" }}>
                                        <Form.Label>Password *</Form.Label>
                                        <div>
                                            <Form.Control
                                                className="form-control-sm rounded-0"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <Link to="#" style={{ fontSize: "12px" }}>Forgot password?</Link>
                                        </div>
                                    </Form.Group>

                                    <br />

                                    {/* Remember Me */}
                                    <Form.Group className="d-flex align-items-center">
                                        <Form.Check type="checkbox" label="Remember me" />
                                    </Form.Group>

                                    <br />

                                    {/* Error Message */}
                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                    {/* Login Button */}
                                    <Form.Group controlId="formButton" className="text-center">
                                    <Button type="submit" className="w-100" 
                                    style={{
                                    width: "100%",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "10px"}}

                                    disabled={loading}>
                                    {loading ? (
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
                                        "Login"
                                    )}
                                </Button>
                                        {/* <Button 
                                            type="submit" 
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "5px",
                                                padding: "10px"
                                            }}
                                        >Login</Button> */}
                                    </Form.Group>

                                    <p className="text-center mt-2" style={{ fontSize: "12px" }}>
                                        By signing in, you agree to our <Link to="#">Terms & Conditions</Link>
                                    </p>

                                    <hr />

                                    {/* OR section */}
                                    <p className="text-center" style={{ fontSize: "14px", color: "#6c757d" }}>OR</p>

                                    {/* eZLogin Button */}
                                    <Button 
                                        variant="outline-primary" 
                                        style={{
                                            width: "100%",
                                            color: "#007bff",
                                            border: "1px solid #007bff",
                                            borderRadius: "5px",
                                            padding: "10px"
                                        }}
                                        as={Link} to="/register">Sign in via TruMedsRX</Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
