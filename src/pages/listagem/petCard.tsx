import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css';

type Props = {
    nome: string;
    genero: string;
    tipo: string;
    raca: string;
    tutorId: number;
    tutorNome: string;
    onExcluir: (id: number, nome: string) => void;
};

export default function PetCard({ nome, genero, tipo, raca, tutorId, tutorNome, onExcluir }: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <Card key={`${tutorId}-${nome}`} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome:</strong> {nome}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Raça:</strong> {raca}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Gênero:</strong> {genero}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Tipo:</strong> {tipo}</span>
                    </div>
                    <div className="card-column">
                        <span><strong>Tutor:</strong> {tutorNome}</span>
                    </div>
                    <div className="card-icons">
                        <a href={`/pet/atualizar/${tutorId}/${nome}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(tutorId, nome)} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
