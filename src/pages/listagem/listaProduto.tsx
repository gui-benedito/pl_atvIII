import { useState, useEffect } from "react";
import ProdutoCard from "./podutoCard";
import imgSemProduto from "../../images/produto-vazio.webp";
import Modal from "../../componentes/Modal";

type Produto = {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
};

export default function ListaProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtoIdParaExcluir, setProdutoIdParaExcluir] = useState<number | null>(null);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const storedProdutos = JSON.parse(localStorage.getItem("produtos") || "[]");
        setProdutos(storedProdutos);
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setProdutoIdParaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = () => {
        if (produtoIdParaExcluir !== null) {
            const updatedProdutos = produtos.filter((produto) => produto.id !== produtoIdParaExcluir);
            localStorage.setItem("produtos", JSON.stringify(updatedProdutos));
            setProdutos(updatedProdutos);
            setOpenModalExcluir(false);
            setProdutoIdParaExcluir(null);
            setOpenModalMensagem(true);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Produtos</h2>
                <a href="/produto" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/produto/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                <ProdutoCard
                    key={0}
                    id={0}
                    nome={'Ração'}
                    valor={85}
                    quantidade={150}
                    onExcluir={() => openModalConfirmaExcluir(0)}
                />
                {produtos.map((produto) => (
                    <ProdutoCard
                        key={produto.id}
                        id={produto.id}
                        nome={produto.nome}
                        valor={produto.valor}
                        quantidade={produto.quantidade}
                        onExcluir={() => openModalConfirmaExcluir(produto.id)}
                    />
                ))}
                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do produto?"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={closeModalExcluir} className="btn btn-danger">Cancelar</button>
                            <button onClick={confirmaExcluir} className="btn btn-primary">Confirmar</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
                <Modal
                    isOpen={openModalMensagem}
                    label="Produto excluído com sucesso"
                    buttons={
                        <div className="confirma-buttons">
                            <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                        </div>
                    }
                >
                    <></>
                </Modal>
            </div>
        </>
    );
}
