import { useEffect, useState } from "react";
import ConsumoCard from "./consumoCard";
import '../css/style.css';

type ClienteType = {
    id: number;
    nome: string;
    nomeSocial: string;
    cpf: {
        valor: string;
        dataEmissao: string;
    };
    rg: {
        valor: string;
        dataEmissao: string;
    };
    telefones: [
        {
            ddd: string;
            numero: string;
        }
    ];
    email: string;
    pets: [];
    produtosConsumidos: [];
    servicosConsumidos: [];
};

export default function Consumo() {
    const [clientes, setClientes] = useState<ClienteType[]>([]);

    useEffect(() => {
        const clientesData = JSON.parse(localStorage.getItem("clientes") || "[]");
        setClientes(Array.isArray(clientesData) ? clientesData : []);
    }, []);

    return (
        <div className="consumo-container">
            <div className="Card-container">
                {clientes.length <= 0 ? (
                    <div>
                        <h3>Sem consumos</h3>
                    </div>
                ) : (
                    clientes.map((cliente) => (
                        <ConsumoCard
                            key={cliente.id}
                            id={cliente.id}
                            nome={cliente.nome}
                            produtosConsumidos={cliente.produtosConsumidos}
                            servicosConsumidos={cliente.servicosConsumidos}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
