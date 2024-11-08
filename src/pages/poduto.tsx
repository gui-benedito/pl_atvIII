import NavbarPL from "../componentes/Navbar";
import { Outlet } from "react-router-dom";

export default function Produto() {
    return (
        <>
            <NavbarPL />
            <div id="main-container">
                <Outlet />
            </div>
        </>
    );
}
