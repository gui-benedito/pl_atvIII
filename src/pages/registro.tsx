import NavbarPL from "../componentes/Navbar";
import './css/style.css';
import { Outlet } from "react-router-dom";

export default function Registro() {
    return (
        <>
            <NavbarPL />
            <div id="main-container">
                <div className="headerOutros">
                    <a href="/registro" key="lista"><button className="header-btn-outros">Registrar Venda</button></a>
                    <a href="/registro/consumo" key="lista"><button className="header-btn-outros">Consumo</button></a>
                    <a href="/registro/mais-consumidos-quantidade" key="lista"><button className="header-btn-outros">10 que mais consumiram</button></a>
                    <a href="/registro/mais-consumidos-valor" key="lista"><button className="header-btn-outros">5 que mais consumiram</button></a>
                    <a href="/registro/mais-consumidos" key="lista"><button className="header-btn-outros">Mais consumidos</button></a>
                    <a href="/registro/consumidos-pet" key="lista"><button className="header-btn-outros">Consumidos por Pet</button></a>
                </div>
                <Outlet />
            </div>
        </>
    );
}
