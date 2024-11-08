import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import '../css/style.css';
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";

type Props = {
    id: number;
    nome: string;
    produtosConsumidos: Produto[];
    servicosConsumidos: Servico[];
};

export default function ConsumoCard({ id, nome, produtosConsumidos, servicosConsumidos }: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    const listarProduto = () => {
        let produtos: { [key: string]: number } = {};
        produtosConsumidos.forEach((p) => {
            produtos[p.nome] = (produtos[p.nome] || 0) + 1;
        });
        return produtos;
    };

    const listarServico = () => {
        let servicos: { [key: string]: number } = {};
        servicosConsumidos.forEach((s) => {
            servicos[s.nome] = (servicos[s.nome] || 0) + 1;
        });
        return servicos;
    };

    const produtosContados = listarProduto();
    const servicosContados = listarServico();

    return (
        <Card key={id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome:</strong> {nome}</span>
                    </div>
                    <div className="card-icons">
                        {show ? 
                            <BsArrowUp onClick={toggleShow} style={{ color: 'blue' }} className="icon" /> : 
                            <BsArrowDown onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        }
                    </div>
                </div>
                {show && (
                    <div className="card-infos">
                        <div className="card-sub-infos">
                            <strong>Produtos Consumidos:</strong>
                            {Object.entries(produtosContados).length > 0 ? (
                                Object.entries(produtosContados).map(([nome, quantidade], index) => (
                                    <span key={index}>
                                        Produto: {nome}, quantidade: {quantidade}
                                    </span>
                                ))
                            ) : (
                                <span>Sem produtos cadastrados</span>
                            )}
                        </div>
                        <div className="card-sub-infos">
                            <strong>Serviços Consumidos:</strong>
                            {Object.entries(servicosContados).length > 0 ? (
                                Object.entries(servicosContados).map(([nome, quantidade], index) => (
                                    <span key={index}>
                                        Serviço: {nome}, quantidade: {quantidade}
                                    </span>
                                ))
                            ) : (
                                <span>Sem serviços cadastrados</span>
                            )}
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
