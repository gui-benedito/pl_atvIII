import { useState, useEffect } from "react";
import Pet from "../../modelo/pet";
import { Col, Row } from "react-bootstrap";
import Modal from "../../componentes/Modal";
import { Navigate } from "react-router-dom";

export default function AtualizarPet() {
    const [pet, setPet] = useState<Pet | null>(null);
    const [nomeState, setNomeState] = useState("");
    const [racaState, setRacaState] = useState("");
    const [tipoState, setTipoState] = useState("");
    const [generoState, setGeneroState] = useState("");
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const tutor = +pathSegments[pathSegments.length - 2];
        const nome = pathSegments[pathSegments.length - 1];
        if (tutor && nome) {
            const clientesSalvos = JSON.parse(localStorage.getItem("clientes") || "[]");
            let foundPet = null;
            for (const cliente of clientesSalvos) {
                if (cliente.id === tutor) {
                    foundPet = cliente.pets.find((pet: any) => pet.nome === nome);
                    if (foundPet) {
                        foundPet = { ...foundPet, tutor: cliente.id };
                        setPet(foundPet);
                        setNomeState(foundPet.nome);
                        setRacaState(foundPet.raca);
                        setTipoState(foundPet.tipo);
                        setGeneroState(foundPet.genero);
                        break;
                    }
                }
            }
            if (foundPet) {
                setPet(foundPet);
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = () => {
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const redirect = () => {
        setTimeout(() => {
            setRedirectToLista(true);
        }, 500);
    };

    if (redirectToLista) {
        return <Navigate to="/pet" />;
    }

    if (!pet) return null;

    return (
        <div className="container-fluid">
            <h2>Cadastrar Pet</h2>
            <form id="form-pet" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                onChange={(e) => setNomeState(e.target.value)}
                                value={nomeState}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Raça"
                                aria-label="Raça"
                                onChange={(e) => setRacaState(e.target.value)}
                                value={racaState}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Gênero"
                                aria-label="Gênero"
                                onChange={(e) => setGeneroState(e.target.value)}
                                value={generoState}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tipo"
                                aria-label="Tipo"
                                onChange={(e) => setTipoState(e.target.value)}
                                value={tipoState}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar" type="submit">Atualizar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma a atualização do pet?"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalCadastro} className="btn btn-danger">Cancelar</button>
                        <button onClick={confirmaAtualizacao} className="btn btn-primary">Confirmar</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagem}
                label="Pet atualizado com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={redirect} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </div>
    );
}
