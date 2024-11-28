import { useState, useEffect } from "react";
import ClienteCard from "./clienteCard";
import { Outlet } from "react-router-dom";
import Modal from "../../componentes/Modal";
import imgSemCliente from "../../images/lista-vazia.jpg";
import '../css/style.css';

type ClienteType = {
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
    pets: [];
    produtosConsumidos: [];
    servicosConsumidos: [];
};

export default function ListaCliente() {
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [openModalExcluir, setOpenModalExcluir] = useState(false);
    const [clienteIdParaExcluir, setClienteIdParaExcluir] = useState<number | null>(null);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const storedClientes = JSON.parse(localStorage.getItem("clientes") || "[]");
        setClientes(Array.isArray(storedClientes) ? storedClientes : []);
    }, []);

    const closeModalExcluir = () => setOpenModalExcluir(false);

    const openModalConfirmaExcluir = (id: number) => {
        setClienteIdParaExcluir(id);
        setOpenModalExcluir(true);
    };

    const closeModalMensagem = () => setOpenModalMensagem(false);

    const confirmaExcluir = () => {
        if (clienteIdParaExcluir !== null) {
            const updatedClientes = clientes.filter((cliente) => cliente.id !== clienteIdParaExcluir);
            localStorage.setItem("clientes", JSON.stringify(updatedClientes));
            setClientes(updatedClientes);
            setOpenModalExcluir(false);
            setClienteIdParaExcluir(null);
            setOpenModalMensagem(true);
        }
    };

    return (
        <>
            <div className="header">
                <h2>Lista de Clientes</h2>
                <a href="/cliente" key="lista"><button className="header-btn">Lista</button></a>
                <a href="/cliente/cadastro" key="cadastrar"><button className="header-btn">Cadastrar</button></a>
            </div>
            <div className="Card-container">
                <>
                    <ClienteCard
                        key={1}
                        id={1}
                        nome="João Silva"
                        nomeSocial="Joãozinho"
                        cpf={{
                            valor: "123.456.789-00",
                            dataEmissao: "2023-05-15",
                        }}
                        rg={{
                            valor: "12.345.678-9",
                            dataEmissao: "2020-03-20",
                        }}
                        telefones={
                            [{
                                ddd: '12',
                                numero: '991810093'
                            }]
                        }
                        email="joao.silva@example.com"
                        onExcluir={() => openModalConfirmaExcluir(1)}
                        pets={[]}
                    />
                    {clientes.map((cliente) => (
                        <ClienteCard
                            key={cliente.id}
                            id={cliente.id}
                            nome={cliente.nome}
                            nomeSocial={cliente.nomeSocial}
                            cpf={{
                                valor: cliente.cpf.valor,
                                dataEmissao: cliente.cpf.dataEmissao,
                            }}
                            rg={{
                                valor: cliente.rg.valor,
                                dataEmissao: cliente.rg.dataEmissao,
                            }}
                            telefones={cliente.telefones}
                            email={cliente.email}
                            onExcluir={() => openModalConfirmaExcluir(cliente.id)}
                            pets={cliente.pets}
                        />
                    ))}
                </>
            </div>
            <Modal
                isOpen={openModalExcluir}
                label="Confirma a exclusão do cliente?"
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
                label="Cliente excluído com sucesso"
                buttons={
                    <div className="confirma-buttons">
                        <button onClick={closeModalMensagem} className="btn btn-secondary">Ok</button>
                    </div>
                }
            >
                <></>
            </Modal>
            <Outlet />
        </>
    );
}
