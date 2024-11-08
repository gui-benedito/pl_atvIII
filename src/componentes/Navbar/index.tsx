import { Button, Container, Nav, Navbar } from "react-bootstrap";
import './style.css';

export default function NavbarPL() {
    return (
        <Navbar expand="lg" className="nav-container">
            <Container>
                <Navbar.Brand className="brand" href="/">PetLover</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto btn-group">
                        <Nav.Link href="/cliente">
                            <Button variant="light" className="navBtn">Clientes</Button>
                        </Nav.Link>
                        <Nav.Link href="/pet">
                            <Button variant="light" className="navBtn">Pets</Button>
                        </Nav.Link>
                        <Nav.Link href="/produto">
                            <Button variant="light" className="navBtn">Produtos</Button>
                        </Nav.Link>
                        <Nav.Link href="/servico">
                            <Button variant="light" className="navBtn">Serviços</Button>
                        </Nav.Link>
                        <Nav.Link href="/registro">
                            <Button variant="light" className="navBtn">Registros</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
