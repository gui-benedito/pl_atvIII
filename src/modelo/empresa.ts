import Cliente from "./cliente"
import CPF from "./cpf"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"

export default class Empresa{
    static getClientes: any
    CadastroServico() {
        throw new Error("Method not implemented.")
    }
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public set setClientes(newClientes: Array<Cliente>){
        this.clientes = newClientes
    }

    public set setProdutos(produtos: Array<Produto>){
        this.produtos = produtos
    }

    public set setServicos(servicos: Array<Servico>){
        this.servicos = servicos
    }

    public findCliente(id: number){
        return this.clientes[id]
    }

    public confirmaProduto(): boolean{
        if(!this.produtos.length){
            console.log(`Sem produtos cadastrados!`)

            return false
        }
        return true
    }

    public confirmaServico(): boolean{
        if(!this.servicos.length){
            console.log(`Sem serviços cadastrados!`)

            return false
        }
        return true
    }

    public confirmaClientes(): boolean{
        if(!this.clientes.length){
            console.log(`Sem clientes cadastrados!`)

            return false
        }
        return true
    }
}
//     public deletar(): void{
//         let id = this.entrada.receberNumero(`Id do cliente a ser deletado: `);
//         // Verifica se o id está dentro do intervalo de clientes
//         if (id >= 0 && id < this.clientes.length) {
//             this.clientes.splice(id, 1) // Remove o cliente no índice `id`
//             console.log(`Cliente deletado com sucesso!`);
//         } else {
//             console.log(`ID inválido. Nenhum cliente foi deletado.`);
//         }
//     }

//     public updateCliente(){
//         let id = this.entrada.receberNumero(`Id do cliente a ser atualziado: `)
//         let cliente = this.getClientes[id]
//         if(!cliente){
//             console.log('Cliente não encontrado!')
//             return
//         }
//         let nome = this.entrada.receberTexto(`Novo nome do cliente: `)
//         let nomeSocial = this.entrada.receberTexto(`Novo nome social do cliente: `)

//         let valorCPF = this.entrada.receberTexto(`Novo número do cpf: `);
//         let dataCPF = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
//         let partesDataCPF = dataCPF.split('/')
//         let anocpf = new Number(partesDataCPF[2].valueOf()).valueOf()
//         let mescpf = new Number(partesDataCPF[1].valueOf()).valueOf()
//         let diacpf = new Number(partesDataCPF[0].valueOf()).valueOf()
//         let dataEmissaoCPF = new Date(anocpf, mescpf, diacpf)
//         let cpf = new CPF(valorCPF, dataEmissaoCPF);

//         let valorRG = this.entrada.receberTexto(`Novo número do rg: `);
//         let dataRG = this.entrada.receberTexto(`Por favor informe a data de emissão do rg, no padrão dd/mm/yyyy: `);
//         let partesData = dataRG.split('/')
//         let ano = new Number(partesData[2].valueOf()).valueOf()
//         let mes = new Number(partesData[1].valueOf()).valueOf()
//         let dia = new Number(partesData[0].valueOf()).valueOf()
//         let dataEmissaoRG = new Date(ano, mes, dia)
//         let rg = new RG(valorRG, dataEmissaoRG);

//         cliente.updateCliente(nome, nomeSocial, cpf, rg)
//         console.log(`Cliente atualizado`)
//     }

//     public vendaProduto(): void{
//         let idCliente = this.entrada.receberNumero(`Id do cliente: `)
//         let cliente = this.getClientes[idCliente]
//         if(!cliente){
//             console.log('Cliente não encontrado!')
//             return
//         }
//         let idProduto = this.entrada.receberNumero(`Id do produto: `)
//         let produto = this.getProdutos[idProduto]
//         if(!produto){
//             console.log('Produto não encontrado!')
//             return
//         }
//         let quantidade = this.entrada.receberNumero("Quantidade: ")
//         for(let i = 1; i <= quantidade; i++){
//             cliente.getProdutosConsumidos.push(produto)
//         }
//         produto.quantidade -= quantidade
//         console.log(`Venda cadastrada`)
//     }

//     public vendaServico(){
//         let idCliente = this.entrada.receberNumero(`Id do cliente: `)
//         let cliente = this.getClientes[idCliente]
//         if(!cliente){
//             console.log('Cliente não encontrado!')
//             return
//         }
//         let idServico = this.entrada.receberNumero(`Id do serviço: `)
//         let servico = this.getServicos[idServico]
//         if(!servico){
//             console.log('Produto não encontrado!')
//             return
//         }
//         cliente.getServicosConsumidos.push(servico)
//         console.log(`Venda cadastrada`)
//     }
// }