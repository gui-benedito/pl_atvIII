import { useState } from "react";
import Produto from "../../modelo/produto";
import Servico from "../../modelo/servico";
import Cliente from "../../modelo/cliente";
import { Col, Form, Row } from "react-bootstrap";
import '../css/style.css';
import Modal from "../../componentes/Modal";

export default function Venda() {
    const [clientes, setClientes] = useState<Cliente[] | null>(JSON.parse(localStorage.getItem('clientes') || '[]'));
    const [produtos, setProdutos] = useState<Produto[] | null>(JSON.parse(localStorage.getItem('produtos') || '[]'));
    const [servicos, setServicos] = useState<Servico[] | null>(JSON.parse(localStorage.getItem('servicos') || '[]'));
    const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
    const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
    const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);
    const [quantidade, setQuantidade] = useState(0);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);
    const [openModalMensagemQuantidade, setOpenModalMensagemQuantidade] = useState(false);

    const handleQuantidade = (quantidade: number) => setQuantidade(quantidade);

    const handleCliente = (id: number) => {
        const cliente = clientes?.find((c) => c.id === id) || null;
        setClienteSelecionado(cliente);
    };

    const handleProduto = (id: number) => {
        const produto = produtos?.find((c) => c.id === id) || null;
        setProdutoSelecionado(produto);
    };

    const handleServico = (id: number) => {
        const servico = servicos?.find((c) => c.id === id) || null;
        setServicoSelecionado(servico);
    };

    const closeModalMensagemQuantidade = () => setOpenModalMensagemQuantidade(false);
    const closeModalCadastro = () => setOpenModalCadastro(false);
    const closeModalMensagem = () => setOpenModalMensagem(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (produtoSelecionado && !quantidade) {
            setOpenModalMensagemQuantidade(true);
        } else {
            setOpenModalCadastro(true);
        }
    };

    const confirmaCadastro = () => {
        if (clientes && clienteSelecionado) {
            const updatedClientes = clientes.map(cliente => {
                if (cliente.id === clienteSelecionado.id) {
                    if (produtoSelecionado) {
                        for (let i = 0; i < quantidade; i++) {
                            cliente.produtosConsumidos.push(produtoSelecionado);
                        }
                    }
                    if (servicoSelecionado) {
                        cliente.servicosConsumidos.push(servicoSelecionado);
                    }
                }
                return cliente;
            });
            setClientes(updatedClientes);
            localStorage.setItem('clientes', JSON.stringify(updatedClientes));
            (document.getElementById('formVenda') as HTMLFormElement).reset();
            setOpenModalCadastro(false);
            setOpenModalMensagem(true);
        }
    };

    if (!clientes || !produtos || !servicos) return null;

    return (
        <div className="form-venda">
            <form onSubmit={handleSubmit} id="formVenda">
                <Row>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleCliente(+e.target.value)}>
                            <option value={0}>Selecione o cliente</option>
                            {clientes.map((c: Cliente) => (
                                <option value={c.id} key={c.id}>
                                    {c.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleProduto(+e.target.value)}>
                            <option value={0}>Selecione o produto</option>
                            {produtos.map((p: Produto) => (
                                <option value={p.id} key={p.id}>
                                    {p.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <div className="input-group mb-3">
                            <input type="number" className="form-control" placeholder="Quantidade" aria-label="Quantidade" onChange={(e) => handleQuantidade(+e.target.value)} />
                        </div>
                    </Col>
                    <Col>
                        <Form.Select aria-label="Selecione o tutor" className="tutor-select" onChange={(e) => handleServico(+e.target.value)}>
                            <option value={0}>Selecione o serviço</option>
                            {servicos.map((s: Servico) => (
                                <option value={s.id} key={s.id}>
                                    {s.nome}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <div className="input-group mb-3">
                    <button className="btn-cadastrar-venda" type="submit">Cadastrar Venda</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma o cadastro da venda?"
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
                label="Venda cadastrada com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>

            <Modal
                isOpen={openModalMensagemQuantidade}
                label="Selecione quantidade de produto"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagemQuantidade} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
        </div>
    );
}
