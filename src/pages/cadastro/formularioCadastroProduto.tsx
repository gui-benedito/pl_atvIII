import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";
import Produto from "../../modelo/produto";

export default function FormularioCadastroProduto() {
    const [nomeState, setNomeState] = useState("");
    const [valorState, setValorState] = useState(0);
    const [quantidadeState, setQuantidadeState] = useState(0);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    const handleNome = (nome: string) => setNomeState(nome);
    const handleValor = (valor: number) => setValorState(valor);
    const handleQuantidade = (quantidade: number) => setQuantidadeState(quantidade);

    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaCadastro = () => {
        const produtos = JSON.parse(localStorage.getItem("produtos") || "[]");
        const id = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
        const newProduto = new Produto(id, nomeState, valorState, quantidadeState);
        produtos.push(newProduto);
        localStorage.setItem("produtos", JSON.stringify(produtos));
        setOpenModalCadastro(false);
        setOpenModalMensagem(true);
    };

    const redirect = () => {
        setTimeout(() => {
            setRedirectToLista(true);
        }, 1000);
    };

    if (redirectToLista) {
        return <Navigate to="/produto" />;
    }

    return (
        <>
            <div className="header">
                <h2>Cadastrar Produto</h2>
                <a href="/produto" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/produto/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <form id="form-produto" onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nome"
                                aria-label="Nome"
                                aria-describedby="basic-addon1"
                                id="inNome"
                                onChange={(e) => handleNome(e.target.value)}
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
                                aria-describedby="basic-addon1"
                                id="inValor"
                                onChange={(e) => handleValor(+e.target.value)}
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
                                aria-describedby="basic-addon1"
                                id="inQuantidade"
                                onChange={(e) => handleQuantidade(+e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar" type="submit">Cadastrar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma o cadastro do produto?"
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
                label="Produto cadastrado com sucesso"
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
