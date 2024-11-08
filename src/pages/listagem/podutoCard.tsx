import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

type ProdutoProps = {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
    onExcluir: (id: number) => void;
};

export default function ProdutoCard({ id, nome, valor, quantidade, onExcluir }: ProdutoProps) {
    return (
        <Card key={id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome: </strong>{nome}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Valor: </strong>R${valor.toFixed(2)}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Quantidade: </strong>{quantidade}</span>
                    </div>
                    <div className="card-icons">
                        <a href={`/produto/atualizar/${id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(id)} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
