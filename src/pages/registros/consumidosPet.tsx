import { useState, useEffect } from "react";
import Cliente from "../../modelo/cliente";
import { Card, Col, Row, Form } from "react-bootstrap";
import '../css/style.css';

type FilteredItem = {
    name: string;
    total: number;
};

export default function ConsumidosPorPet() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [filtered, setFiltered] = useState<FilteredItem[]>([]);
    const [cabecalho, setCabecalho] = useState<string | null>(null);
    const [tipo, setTipo] = useState("");
    const [raca, setRaca] = useState("");
    const [racasDisponiveis, setRacasDisponiveis] = useState<string[]>([]);

    useEffect(() => {
        const clientesData = JSON.parse(localStorage.getItem("clientes") || "[]");
        setClientes(Array.isArray(clientesData) ? clientesData : []);
    }, []);

    const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tipoSelecionado = e.target.value;
        const racasPorTipo: { [key: string]: string[] } = {
            Cachorro: ["Labrador", "Bulldog", "Poodle", "Pastor Alemão", "Golden Retriever", "SRD"],
            Gato: ["Persa", "Siamês", "Maine Coon", "Bengal", "Sphynx", "SRD"]
        };
        setTipo(tipoSelecionado);
        setRacasDisponiveis(racasPorTipo[tipoSelecionado] || []);
        setRaca("");
    };

    const handleRacaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRaca(e.target.value);
    };

    const filtrarConsumidos = (tipoFiltro: "produto" | "servico") => {
        const clientesFiltrados = clientes.filter(cliente =>
            cliente.pets.some((pet: any) =>
                (tipo ? pet.tipo === tipo : true) && (raca ? pet.raca === raca : true)
            )
        );

        if (clientesFiltrados.length === 0) {
            setFiltered([]);
            setCabecalho(`Sem ${tipoFiltro === "produto" ? "produtos" : "serviços"} para ${
                tipo && raca ? `${tipo} e ${raca}` : tipo ? tipo : raca ? raca : "nenhum filtro selecionado"
            }`);
            return;
        }

        let lista: { [key: string]: { valor: number, count: number } } = {};
        setCabecalho(`${tipoFiltro === "produto" ? "Produtos" : "Serviços"} mais consumidos`);

        clientesFiltrados.forEach(cliente => {
            const consumidos = tipoFiltro === "produto" ? cliente.produtosConsumidos : cliente.servicosConsumidos;
            consumidos.forEach((item: any) => {
                if (lista[item.nome]) {
                    lista[item.nome].count += 1;
                } else {
                    lista[item.nome] = { valor: item.valor, count: 1 };
                }
            });
        });

        const listaArray = Object.entries(lista)
            .map(([name, { valor, count }]) => ({ name, total: valor * count }))
            .sort((a, b) => b.total - a.total);

        setFiltered(listaArray);
    };

    return (
        <div className="container-fluid valor-filtro">
            <h2>Filtrar por Tipo e/ou Raça de Pet</h2>
            <Row className="mb-3">
                <Col>
                    <Form.Select onChange={handleTipoChange} value={tipo}>
                        <option value="">Selecione o Tipo</option>
                        <option value="Cachorro">Cachorro</option>
                        <option value="Gato">Gato</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Select onChange={handleRacaChange} value={raca} disabled={!racasDisponiveis.length}>
                        <option value="">Selecione a Raça</option>
                        {racasDisponiveis.map((raca, index) => (
                            <option key={index} value={raca}>{raca}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
            <div className="btn-filtro mb-3">
                <button onClick={() => filtrarConsumidos("produto")} className="header-btn">Filtrar Produtos</button>
                <button onClick={() => filtrarConsumidos("servico")} className="header-btn">Filtrar Serviços</button>
            </div>
            <div className="Card-container container-registro">
                {cabecalho && <h3>{cabecalho}</h3>}
                {filtered.length > 0 && (
                    filtered.map((c, index) => (
                        <Card key={index} className="card-main">
                            <Card.Body>
                                <div className="card-column">
                                    <span><strong>Nome: </strong>{c.name}</span>
                                </div>
                                <div className="card-column">
                                    <span><strong>Valor Total: </strong>{c.total.toFixed(2)}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
