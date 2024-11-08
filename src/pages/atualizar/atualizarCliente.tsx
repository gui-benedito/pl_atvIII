import { useState, useEffect } from "react";
import Cliente from "../../modelo/cliente";
import CPF from "../../modelo/cpf";
import RG from "../../modelo/rg";
import Telefone from "../../modelo/telefone";
import { Navigate } from "react-router-dom";
import Modal from "../../componentes/Modal";

export default function AtualizarCliente() {
    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [redirectToLista, setRedirectToLista] = useState(false);
    const [openModalCadastro, setOpenModalCadastro] = useState(false);
    const [openModalMensagem, setOpenModalMensagem] = useState(false);

    useEffect(() => {
        const pathSegments = window.location.pathname.split("/");
        const id = pathSegments[pathSegments.length - 1];
        if (id) {
            const clientesSalvos = JSON.parse(localStorage.getItem("clientes") || "[]");
            const foundCliente = clientesSalvos.find((c: { id: number }) => c.id === +id);
            if (foundCliente) {
                setCliente(foundCliente);
            }
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setOpenModalCadastro(true);
    };

    const confirmaAtualizacao = () => {
        const clientesSalvos = JSON.parse(localStorage.getItem("clientes") || "[]");
        if (!cliente) return;
        
        const nome = (document.getElementById("inNome") as HTMLInputElement).value;
        const nomeSocial = (document.getElementById("inNomeSocial") as HTMLInputElement).value;
        const cpf = (document.getElementById("inCPF") as HTMLInputElement).value;
        const cpfData = (document.getElementById("inCPFData") as HTMLInputElement).value;
        const rg = (document.getElementById("inRG") as HTMLInputElement).value;
        const rgData = (document.getElementById("inRGData") as HTMLInputElement).value;
        const ddd = (document.getElementById("inDDD") as HTMLInputElement).value;
        const telefone = (document.getElementById("inTelefone") as HTMLInputElement).value;
        const email = (document.getElementById("inEmail") as HTMLInputElement).value;

        const updatedCliente = new Cliente(
            cliente.id,
            nome,
            nomeSocial,
            new CPF(cpf, cpfData),
            new RG(rg, rgData),
            new Telefone(ddd, telefone),
            email
        );

        const updatedClientes = clientesSalvos.map((c: { id: number }) => (c.id === cliente.id ? updatedCliente : c));
        localStorage.setItem("clientes", JSON.stringify(updatedClientes));
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
        return <Navigate to="/cliente" />;
    }

    if (!cliente) return null;

    return (
        <div className="container-fluid">
            <form id="form-cliente" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome" id="inNome" defaultValue={cliente.nome} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Nome social" id="inNomeSocial" defaultValue={cliente.nomeSocial} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="CPF" id="inCPF" defaultValue={cliente.cpf.valor} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Data de emissão" id="inCPFData" defaultValue={cliente.cpf.dataEmissao} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="RG" id="inRG" defaultValue={cliente.rg.valor} />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Data de emissão" id="inRGData" defaultValue={cliente.rg.dataEmissao} />
                </div>
                {cliente.telefones.map((t, i) => (
                    <div key={i}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="DDD" id="inDDD" defaultValue={t.ddd} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Telefone" id="inTelefone" defaultValue={t.numero} />
                        </div>
                    </div>
                ))}
                <div className="input-group mb-3">
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" placeholder="E-mail" id="inEmail" defaultValue={cliente.email} />
                </div>
                <div className="input-group mb-3">
                    <button className="btn-atualizar" type="submit">Atualizar</button>
                </div>
            </form>

            <Modal
                isOpen={openModalCadastro}
                label="Confirma a atualização do cliente?"
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
                label="Cliente atualizado com sucesso"
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
