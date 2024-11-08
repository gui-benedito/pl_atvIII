export default class Servico {
    public id: number
    public nome: string
    public valor: number
    constructor(id:number, nome: string, valor: number){
        this.id = id
        this.nome = nome
        this.valor = valor
    }

    public set setNome(nome: string){
        this.nome = nome
    }
    public set setValor(valor: number){
        this.valor = valor
    }
}