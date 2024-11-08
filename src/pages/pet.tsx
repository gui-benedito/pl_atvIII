import NavbarPL from "../componentes/Navbar";
import Header from "../componentes/Header";
import { Outlet } from "react-router-dom";

export default function Pet() {
    return (
        <>
            <NavbarPL />
            <div id="main-container">
                <Outlet />
            </div>
        </>
    );
}
