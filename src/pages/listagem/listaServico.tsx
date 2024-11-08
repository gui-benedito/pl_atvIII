import { useState, useEffect } from "react";
import ServicoCard from "./servicoCard";
import imgSemServio from "../../images/servico-vazio.jpg";
import Modal from "../../componentes/Modal";

type Servico = {
    id: number;
    nome: string;
    valor: number;
    quantidade: number;
};

export default function ListaServico() {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [servicoIdparaExcluir, setServicoIdparaExcluir] = useState<number | null>(null);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const storedServicos = JSON.parse(localStorage.getItem("servicos") || "[]");
        setServicos(storedServicos);
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setServicoIdparaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = () => {
        if (servicoIdparaExcluir !== null) {
            const updatedServicos = servicos.filter((servico) => servico.id !== servicoIdparaExcluir);
            localStorage.setItem("servicos", JSON.stringify(updatedServicos));
            setServicos(updatedServicos);
            setOpenModalExcluir(false);
            setServicoIdparaExcluir(null);
            setOpenModalMensagem(true);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Servicos</h2>
                <a href="/servico" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/servico/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                {servicos.length <= 0 ? (
                    <div className="lista-vazia">
                        <img src={imgSemServio} alt="Sem serviços" />
                    </div>
                ) : (
                    servicos.map((servico) => (
                        <ServicoCard
                            key={servico.id}
                            id={servico.id}
                            nome={servico.nome}
                            valor={servico.valor}
                            onExcluir={() => openModalConfirmaExcluir(servico.id)}
                        />
                    ))
                )}
                <Modal
                    isOpen={openModalExcluir}
                    label="Confirma a exclusão do serviço?"
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
                    label="Serviço excluído com sucesso"
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
