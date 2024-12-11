import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming you have custom CSS for styling

function HomePage() {
  const [showAbout, setShowAbout] = useState(false);

  // Function to toggle between the main content and the "About" section
  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleHideAbout = () => {
    setShowAbout(false);
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: "#ADD8E6" }}>
        <Container>
          <Navbar.Brand href="#" style={{ fontFamily: "fantasy", fontSize: "28px" }}>
            TruMedsRX
          </Navbar.Brand>
          <Nav className="justify-content-start">
            <Nav.Link as={Link} to="#" onClick={handleHideAbout}>Home</Nav.Link>
            <Nav.Link as={Link} to="#" onClick={handleShowAbout}>About</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button variant="outline-primary" as={Link} to="/login">Login</Button>
            <Button variant="primary" as={Link} to="/register">Register</Button>
            <Nav.Link>
              <span className="d-flex align-items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/1200px-Flag_of_the_Philippines.svg.png"
                  alt="Philippines flag"
                  style={{ width: '24px', marginRight: '8px' }}
                />
                <span>Philippines</span>
              </span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Conditionally render either the Hero Section or the About section */}
      {!showAbout ? (
        <div className="hero-section" style={{ minHeight: "100vh" }}>
          <Container>
            <Row className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
              <Col md={6} className="text-center">
                <h1 className="hero-title">TruMedsRX - Your health, Our Priority</h1>
                <p className="hero-subtitle">
                  TruMedsRX redefines pharmacy ordering with speed, ease, and care. From prescriptions to wellness, we assist your healthcare at your fingertips. Available anytime, anywhere.
                </p>
                <Button variant="primary" size="lg" as={Link} to="/login">Get Started</Button>
              </Col>
              <Col md={6}>
                <img
                  src="/Pharmaceuticals.jpg"
                  alt="Healthcare professional using platform"
                  className="hero-image"
                  width={"500px"}
                  height={"300px"}
                />
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        // About Section
        <div className="about-section" style={{ padding: "40px" }}>
          <Container>
            <h1>About TruMedsRX</h1>
            <p>
              TruMedsRX is committed to revolutionizing healthcare by providing a seamless way for users to manage their medical needs. We aim to offer reliable, quick, and easy access to essential medications.
            </p>
            <p>
              Please note: New files can no longer be created in this system.
            </p>
            <Button variant="secondary" onClick={handleHideAbout}>Go Back</Button>
          </Container>
        </div>
      )}
    </div>
  );
}

export default HomePage;
