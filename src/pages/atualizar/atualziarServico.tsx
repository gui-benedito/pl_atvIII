import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Servico from "../../modelo/servico";
import Modal from "../../componentes/Modal";

export default function AtualizarServico() {
    const [produto, setProduto] = useState<Servico | null>(null);
    const [nomeState, setNomeState] = useState("");
    const [valorState, setValorState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];
        if (id) {
            const produtosSalvos = JSON.parse(localStorage.getItem("servicos") || "[]");
            const foundProduto = produtosSalvos.find((c: { id: number }) => c.id === +id);
            if (foundProduto) {
                setProduto(foundProduto);
                setNomeState(foundProduto.nome);
                setValorState(foundProduto.valor);
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = () => {
        const produtosSalvos = JSON.parse(localStorage.getItem("servicos") || "[]");
        if (!produto) return;
        const updatedProduto = new Servico(
            produto.id,
            nomeState || produto.nome,
            valorState !== 0 ? valorState : produto.valor,
        );
        const updatedProdutos = produtosSalvos.map((c: { id: number }) =>
            (c.id === produto.id ? updatedProduto : c)
        );
        localStorage.setItem("servicos", JSON.stringify(updatedProdutos));
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const redirect = () => {
        setTimeout(() => setRedirectToLista(true), 500);
    };

    if (redirectToLista) {
        return <Navigate to="/servico" />;
    }

    if (!produto) return null;

    return (
        <div className="container-fluid">
            <h2>Atualizar Produto</h2>
            <form id="form-produto" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                id="inNome"
                                onChange={(e) => setNomeState(e.target.value)}
                                value={nomeState}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Valor"
                                aria-label="Valor"
                                id="inValor"
                                onChange={(e) => setValorState(+e.target.value)}
                                value={valorState}
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
                label="Confirma a atualização do serviço?"
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
                label="Serviço atualizado com sucesso"
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
