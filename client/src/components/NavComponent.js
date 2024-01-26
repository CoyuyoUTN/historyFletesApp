
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavComponent = () => {
  return (
<>
 
<Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">FLETES</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 links"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to={"/home"}id='a'> Inicio</Link> 
            <Link to={"/table"} id='a'> Fletes</Link>
            </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavComponent;

