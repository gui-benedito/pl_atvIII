import { useState } from "react";
import { Card } from "react-bootstrap";
import { BsArrowDown, BsArrowUp, BsFillPencilFill, BsXLg } from "react-icons/bs";
import '../css/style.css';

type Pet = {
    nome: string;
    genero: string;
    tipo: string;
    raca: string;
};

type Props = {
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
    pets: Pet[];
    onExcluir: (id: number) => void;
};

export default function ClienteCard({
    id,
    nome,
    nomeSocial,
    cpf,
    rg,
    telefones,
    email,
    pets,
    onExcluir,
}: Props) {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
        <Card key={id} className="card-main">
            <Card.Body>
                <div className="card-item">
                    <div className="card-column">
                        <span><strong>Nome Social:</strong></span><span> {nomeSocial}</span>
                    </div>
                    <div className="card-column">
                        {telefones && Array.isArray(telefones) ? (
                            telefones.map((t, idx) => (
                                <span key={idx}><strong>Telefone:</strong> ({t.ddd}) {t.numero}</span>
                            ))
                        ) : (
                            <p><strong>Telefone:</strong> N/A</p>
                        )}
                    </div>
                    <div className="card-column">
                        <span><strong>Email:</strong></span><span> {email}</span>
                    </div>
                    <div className="card-icons">
                        {show ? (
                            <BsArrowUp onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        ) : (
                            <BsArrowDown onClick={toggleShow} style={{ color: 'blue' }} className="icon" />
                        )}
                        <a href={`/cliente/atualizar/${id}`} style={{ color: 'blue' }}>
                            <BsFillPencilFill />
                        </a>
                        <BsXLg className="icon" style={{ color: 'red' }} onClick={() => onExcluir(id)} />
                    </div>
                </div>
                {show && (
                    <>
                        <div className="card-infos">
                            <div className="card-column">
                                <span><strong>Nome:</strong> {nome}</span>
                            </div>
                            <div className="card-column docs">
                                <span><strong>CPF:</strong> {cpf.valor}</span>
                                <span><strong>Data de Emissão:</strong> {cpf.dataEmissao}</span>
                            </div>
                            <div className="card-column docs">
                                <span><strong>RG:</strong> {rg.valor}</span>
                                <span><strong>Data de Emissão:</strong> {rg.dataEmissao}</span>
                            </div>
                        </div>
                        <div className="card-infos-pets">
                            {pets.length > 0 && (
                                <>
                                    <h6>Pets:</h6>
                                    {pets.map((pet, index) => (
                                        <span key={index}><strong>Nome:</strong> {pet.nome}</span>
                                    ))}
                                </>
                            )}
                        </div>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}
