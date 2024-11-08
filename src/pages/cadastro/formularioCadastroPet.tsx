import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import '../css/style.css';
import Pet from "../../modelo/pet";
import Modal from "../../componentes/Modal";
import { Navigate } from "react-router-dom";

interface Cliente {
    id: number;
    nome: string;
}

export default function FormularioCadastroPet() {
    const [nomeState, setNomeState] = useState("");
    const [racaState, setRacaState] = useState("");
    const [tipoState, setTipoState] = useState("");
    const [generoState, setGeneroState] = useState("");
    const [tutorState, setTutorState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);
    const [racas, setRacas] = useState<string[]>([]);

    const handleNome = (nome: string) => setNomeState(nome);
    const handleGenero = (genero: string) => setGeneroState(genero);
    const handleRaca = (raca: string) => setRacaState(raca);
    const handleTutor = (e: React.ChangeEvent<HTMLSelectElement>) => setTutorState(+e.target.value);

    const handleTipo = (tipo: string) => {
        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"]
        };
        
        setTipoState(tipo);
        setRacas(racasPorTipo[tipo] || []);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaCadastro = () => {
        const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
        const newPet = new Pet(nomeState, racaState, generoState, tipoState);
        for (const cliente of clientesSalvos) {
            if (cliente.id === tutorState) {
                cliente.pets = cliente.pets || [];
                cliente.pets.push(newPet);
            }
        }
        localStorage.setItem('clientes', JSON.stringify(clientesSalvos));
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const redirect = () => {
        setTimeout(() => setRedirectToLista(true), 1000);
    };

    if (redirectToLista) {
        return <Navigate to="/pet" />;
    }

    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]').map((c: Cliente) => ({
        id: +c.id,
        nome: c.nome
    }));

    return (
        <>
            <div className="header">
                <h2>Cadastrar Pet</h2>
                <a href="/pet" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/pet/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <form id="form-pet" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                id="inNome"
                                onChange={(e) => handleNome(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <Form.Select aria-label="Selecione o Tipo" onChange={(e) => handleTipo(e.target.value)}>
                                <option value="">Tipo</option>
                                <option value="Cachorro">Cachorro</option>
                                <option value="Gato">Gato</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <Form.Select aria-label="Selecione a Raça" onChange={(e) => handleRaca(e.target.value)} disabled={!racas.length}>
                                <option value="">Raça</option>
                                {racas.map((raca, index) => (
                                    <option key={index} value={raca}>{raca}</option>
                                ))}
                            </Form.Select>
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <Form.Select aria-label="Selecione o Gênero" onChange={(e) => handleGenero(e.target.value)}>
                                <option value="">Gênero</option>
                                <option value="Macho">Macho</option>
                                <option value="Fêmea">Fêmea</option>
                            </Form.Select>
                        </div>
                    </Col>
                </Row>
                <Form.Select aria-label="Selecione o Tutor" className="tutor-select" onChange={handleTutor}>
                    <option value={0}>Selecione o tutor</option>
                    {clientes.map((c: Cliente) => (
                        <option value={c.id} key={c.id}>
                            {c.nome}
                        </option>
                    ))}
                </Form.Select>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar" type="submit">Cadastrar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma o cadastro do pet?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalCadastro} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaCadastro} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagem}
                label="Pet cadastrado com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={redirect} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </>
    );
}
