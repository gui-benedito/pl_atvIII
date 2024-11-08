import NavbarPL from "../componentes/Navbar";
import { Outlet } from "react-router-dom";
import './css/style.css';

export default function Cliente() {
    return (
        <>
            <NavbarPL />
            <div id="main-container">
                <Outlet />
            </div>
        </>
    );
}
