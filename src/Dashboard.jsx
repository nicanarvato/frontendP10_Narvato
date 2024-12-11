import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

import { Nav, Navbar, Container, Button, Form, NavDropdown, Row, Col, Card, Carousel, ListGroup } from 'react-bootstrap';

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
        <div className='container' style={{height:"100vh", width:"100vw", padding:"0"}}>
            <Carousel >
            <Carousel.Item>
                <img src='9891033.jpg' style={{width: "100%", height: "168px", objectFit: "cover" }}  />
            </Carousel.Item>
            <Carousel.Item>
                <img src='6188530.jpg' style={{width: "100%", height: "168px", objectFit: "cover" }} />
            </Carousel.Item><Carousel.Item>
                <img src='17677.jpg' style={{width: "100%", height: "168px", objectFit: "cover" }} />
            </Carousel.Item>
            </Carousel>
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
                        <Nav className="ms-100%">
                            <NavDropdown title={user ? `User: ${user.username}` : 'Account'} id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="bg-danger text-white py-2">
    <Container>
        <Navbar expand="lg">
            <Navbar.Toggle aria-controls="second-navbar-content" />
            <Navbar.Collapse id="second-navbar-content">
                <Nav className="justify-content-center">
                    <Nav.Link href="#" className="text-white">TruMedsRX Pharmacy</Nav.Link>
                    <Nav.Link href="#" className="text-white">Pharmacy</Nav.Link>
                    <Nav.Link href="#" className="text-white">Health Care</Nav.Link>
                    <Nav.Link href="#" className="text-white">Beauty</Nav.Link>
                    <Nav.Link href="#" className="text-white">Personal Care</Nav.Link>
                    <Nav.Link href="#" className="text-white">Baby & Kids</Nav.Link>
                    <Nav.Link href="#" className="text-warning">SALE</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Container>
</div>


            <Container className="mt-4">
                <Row style={{ backgroundColor: "blue", color: "white", alignItems: "center" }}>
                    <Col lg={6}>
                        <h3 style={{ color: "white", fontFamily:"cursive", fontWeight:"bold" }}>TRUSERVE <br /> PHARMACEUTICAL</h3>
                    </Col>
                    <Col lg={6} className="text-center">
                        <img src="/bg.jpg" alt="Truserve" style={{ height: "350px", width: "100%", objectFit: "cover" }} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Product Categories</Card.Title>
                            <ListGroup className="list-group-flush" >
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col lg={9}>
                        <Row className='g-4 mt-2'>
                        <Col>
                                <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='g-4 mt-4'>
                        <Col>
                                <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                    <Card.Title>Product Name</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                    </Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>


        </div>
    );
}

export default Dashboard;