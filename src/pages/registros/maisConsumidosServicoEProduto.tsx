import { useState } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css';

type FilteredItem = {
    name: string;
    qtd: number;
};

export default function MaisConsumidosServicoEProduto() {
    const [clientes] = useState<Cliente[]>(JSON.parse(localStorage.getItem('clientes') || '[]'));
    const [filtered, setFiltered] = useState<FilteredItem[]>([]);
    const [cabecalho, setCabecalho] = useState<string | null>(null);

    const produtosMaisConsumidos = () => {
        if (!clientes || clientes.length === 0) return;
        let lista: { [key: string]: number } = {};
        setCabecalho('Produtos mais consumidos');
        
        clientes.forEach((cliente) => {
            cliente.produtosConsumidos.forEach((p) => {
                lista[p.nome] = (lista[p.nome] || 0) + 1;
            });
        });

        const listaArray = Object.entries(lista)
            .filter(([name, qtd]) => qtd > 0)
            .map(([name, qtd]) => ({ name, qtd }))
            .sort((a, b) => b.qtd - a.qtd);

        setCabecalho(listaArray.length ? 'Produtos mais consumidos' : 'Sem produtos consumidos');
        setFiltered(listaArray);
    };

    const servicosMaisConsumidos = () => {
        if (!clientes || clientes.length === 0) return;
        let lista: { [key: string]: number } = {};

        clientes.forEach((cliente) => {
            cliente.servicosConsumidos.forEach((s) => {
                lista[s.nome] = (lista[s.nome] || 0) + 1;
            });
        });

        const listaArray = Object.entries(lista)
            .filter(([name, qtd]) => qtd > 0)
            .map(([name, qtd]) => ({ name, qtd }))
            .sort((a, b) => b.qtd - a.qtd);

        setCabecalho(listaArray.length ? 'Serviços mais consumidos' : 'Sem serviços consumidos');
        setFiltered(listaArray);
    };

    return (
        <>
            <div className="btn-filtro">
                <button onClick={produtosMaisConsumidos} className="header-btn">Produto</button>
                <button onClick={servicosMaisConsumidos} className="header-btn">Serviço</button>
            </div>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {filtered.length > 0 &&
                    filtered.map((c, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span><strong>Nome: </strong>{c.name}</span>
                                </div>
                                <div className="card-column">
                                    <span><strong>Quantidade: </strong>{c.qtd}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </>
    );
}
