import NavbarPL from "../componentes/Navbar";
import { Outlet } from "react-router-dom";

export default function Servico() {
    return (
        <>
            <NavbarPL />
            <div id="main-container">
                <Outlet />
            </div>
        </>
    );
}
