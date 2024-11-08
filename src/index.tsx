import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cliente from './pages/cliente';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormularioCadastroCliente from './pages/cadastro/formularioCadastroCliente';
import ListaCliente from './pages/listagem/listaCliente';
import AtualizarCliente from './pages/atualizar/atualizarCliente';
import Pet from './pages/pet';
import FormularioCadastroPet from './pages/cadastro/formularioCadastroPet';
import ListaPet from './pages/listagem/listaPet';
import AtualizarPet from './pages/atualizar/atualizarPet';
import Produto from './pages/poduto';
import Servico from './pages/servico';
import Outros from './pages/registro';
import ListaProduto from './pages/listagem/listaProduto';
import AtualizarProduto from './pages/atualizar/atualizarProduto';
import FormularioCadastroProduto from './pages/cadastro/formularioCadastroProduto';
import ListaServico from './pages/listagem/listaServico';
import FormularioCadastroServico from './pages/cadastro/formularioCadastroServico';
import AtualizarServico from './pages/atualizar/atualziarServico';
import Registro from './pages/registro';
import Venda from './pages/registros/venda';
import Consumo from './pages/registros/consumo';
import MaisConsumidos from './pages/registros/maisConsumidos';
import MaisConsumidosValor from './pages/registros/maisConsumidosValor';
import MaisConsumidosServicoEProduto from './pages/registros/maisConsumidosServicoEProduto';
import ConsumidosPorPet from './pages/registros/consumidosPet';
import ConsumidosPet from './pages/registros/consumidosPet';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          </Route>
          <Route path="cliente" element={<Cliente />}>
            <Route index element={<ListaCliente />} />
            <Route path="cadastro" element={<FormularioCadastroCliente />} />
            <Route path="atualizar/:id" element={<AtualizarCliente />} />
          </Route>
          <Route path="pet" element={<Pet />}>
            <Route index element={<ListaPet/>} />
            <Route path="cadastro" element={<FormularioCadastroPet />} />
            <Route path="atualizar/:id/:nome" element={<AtualizarPet />} />
          </Route>
          <Route path="produto" element={<Produto />}>
            <Route index element={<ListaProduto/>} />
            <Route path="cadastro" element={<FormularioCadastroProduto />} />
            <Route path="atualizar/:id" element={<AtualizarProduto />} />
          </Route>
          <Route path="servico" element={<Servico />}>
          <Route index element={<ListaServico/>} />
            <Route path="cadastro" element={<FormularioCadastroServico />} />
            <Route path="atualizar/:id" element={<AtualizarServico />} />
          </Route>
          <Route path="registro" element={<Registro />}>
            <Route index element={<Venda/>} />
            <Route path='consumo' element={<Consumo/>} />
            <Route path='mais-consumidos-quantidade' element={<MaisConsumidos/>}/>
            <Route path='mais-consumidos-valor' element={< MaisConsumidosValor />}/>
            <Route path='mais-consumidos' element={<MaisConsumidosServicoEProduto/>} />
            <Route path='consumidos-pet' element={<ConsumidosPet/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
