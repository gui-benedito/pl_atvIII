import { useEffect, useState } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css';

type ClienteSorted = {
    nome: string;
    valor: number;
};

export default function MaisConsumidosValor() {
    const [clientesFiltered, setClientesFiltered] = useState<ClienteSorted[]>([]);
    const [cabecalho, setCabecalho] = useState("");

    useEffect(() => {
        const clientes = getClientes();
        if (clientes) {
            cincoMais(clientes);
        }
    }, []);

    const getClientes = (): Cliente[] => JSON.parse(localStorage.getItem('clientes') || '[]');

    const cincoMais = (clientes: Cliente[]) => {
        const lista: { [key: string]: number } = {};

        clientes.forEach((cliente) => {
            if (!lista[cliente.nome]) {
                lista[cliente.nome] = 0;
            }
            cliente.produtosConsumidos.forEach((p) => {
                lista[cliente.nome] += p.valor;
            });
            cliente.servicosConsumidos.forEach((s) => {
                lista[cliente.nome] += s.valor;
            });
        });

        const listaOrdenada = Object.entries(lista)
            .filter(([name, qtd]) => qtd > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([nome, valor]) => ({ nome, valor }));

        setCabecalho(listaOrdenada.length > 0 ? "Clientes que mais consumiram por valor" : "Sem consumos");
        setClientesFiltered(listaOrdenada);
    };

    return (
        <div className="Card-container card-valor container-registro">
            {cabecalho && <h3>{cabecalho}</h3>}
            {clientesFiltered.length > 0 &&
                clientesFiltered.map((c, index) => (
                    <Card key={index} className="card-main">
                        <Card.Body>
                            <div className="card-column">
                                <span><strong>Nome: </strong>{c.nome}</span>
                            </div>
                            <div className="card-column">
                                <span><strong>Valor: </strong>R$ {c.valor.toFixed(2)}</span>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
}
