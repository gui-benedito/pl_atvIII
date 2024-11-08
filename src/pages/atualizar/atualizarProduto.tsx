import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Produto from "../../modelo/produto";
import Modal from "../../componentes/Modal";

export default function AtualizarProduto() {
    const [produto, setProduto] = useState<Produto | null>(null);
    const [nomeState, setNomeState] = useState("");
    const [valorState, setValorState] = useState(0);
    const [quantidadeState, setQuantidadeState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const pathSegments = window.location.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];
        if (id) {
            const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
            const foundProduto = produtosSalvos.find((c: { id: number }) => c.id === +id);
            if (foundProduto) {
                setProduto(foundProduto);
                setNomeState(foundProduto.nome);
                setValorState(foundProduto.valor);
                setQuantidadeState(foundProduto.quantidade);
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = () => {
        const produtosSalvos = JSON.parse(localStorage.getItem("produtos") || "[]");
        if (!produto) return;
        const updatedProduto = new Produto(
            produto.id,
            nomeState || produto.nome,
            valorState !== 0 ? valorState : produto.valor,
            quantidadeState !== 0 ? quantidadeState : produto.quantidade
        );
        const updatedProdutos = produtosSalvos.map((c: { id: number }) =>
            (c.id === produto.id ? updatedProduto : c)
        );
        localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const redirect = () => {
        setTimeout(() => setRedirectToLista(true), 500);
    };

    if (redirectToLista) {
        return <Navigate to="/produto" />;
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
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Quantidade"
                                aria-label="Quantidade"
                                id="inQuantidade"
                                onChange={(e) => setQuantidadeState(+e.target.value)}
                                value={quantidadeState}
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
                label="Confirma a atualização do produto?"
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
                label="Produto atualizado com sucesso"
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
