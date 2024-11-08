import { useState } from "react";
import Cliente from "../../modelo/cliente";
import { Card } from "react-bootstrap";
import '../css/style.css';

type ClienteSortedItem = {
    nome: string;
    qtd: number;
};

export default function MaisConsumidos() {
    const [clientes] = useState<Cliente[]>(JSON.parse(localStorage.getItem('clientes') || '[]'));
    const [clientesFiltered, setClientesFiltered] = useState<ClienteSortedItem[]>([]);
    const [cabecalho, setCabecalho] = useState<string | null>(null);

    const dezProdutosMaisConsumidos = () => {
        if (!clientes.length) {
            setCabecalho('Sem produtos consumidos');
            return;
        }
        setCabecalho('Clientes que mais consumiram por produto');
        const maisConsumiram = clientes.map(cliente => ({
            nome: cliente.nome,
            qtd: cliente.produtosConsumidos.length
        }));
        
        const dezMais = maisConsumiram
            .filter(c => c.qtd > 0)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 10);

        setCabecalho(dezMais.length ? 'Clientes que mais consumiram por produto' : 'Sem produtos consumidos');
        setClientesFiltered(dezMais);
    };

    const dezServicosMaisConsumidos = () => {
        if (!clientes.length) {
            setCabecalho('Sem serviços consumidos');
            return;
        }
        const maisConsumiram = clientes.map(cliente => ({
            nome: cliente.nome,
            qtd: cliente.servicosConsumidos.length
        }));
        
        const dezMais = maisConsumiram
            .filter(c => c.qtd > 0)
            .sort((a, b) => b.qtd - a.qtd)
            .slice(0, 10);

        setCabecalho(dezMais.length ? 'Clientes que mais consumiram por serviço' : 'Sem serviços consumidos');
        setClientesFiltered(dezMais);
    };

    return (
        <>
            <div className="btn-filtro">
                <button onClick={dezProdutosMaisConsumidos} className="header-btn">Produto</button>
                <button onClick={dezServicosMaisConsumidos} className="header-btn">Serviço</button>
            </div>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {clientesFiltered.length > 0 &&
                    clientesFiltered.map((c, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span><strong>Nome: </strong>{c.nome}</span>
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
