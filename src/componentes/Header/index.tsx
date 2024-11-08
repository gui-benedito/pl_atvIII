import { ReactNode } from "react";
import { Nav, Navbar } from "react-bootstrap";
import './style.css';

type Props = {
    buttons: ReactNode[];
};

export default function Header({ buttons }: Props) {
    return (
        <Navbar className="btn-header">
            <Nav className="button-group">
                {buttons.map((button, index) => (
                    <div key={index} className="nav-button">{button}</div>
                ))}
            </Nav>
        </Navbar>
    );
}
