import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import "../assets/style/index.css";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="VL" className="navbar-logo" />
              MotorMate
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/about">
                <Nav.Link>
                  <ImProfile className="headerFa" />
                  About
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link>
                  <FaUserAlt className="headerFa" />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
