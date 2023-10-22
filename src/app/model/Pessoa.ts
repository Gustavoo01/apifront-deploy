import { Contato } from "./Contato";

export class Pessoa{
    id: number = 0;
    nome: string = '';
    cpf: string = '';
    dataNascimento: string = '';
    contatos: Contato[] = [];

    adicionarContato() {
        this.contatos.push(new Contato());
    }

    removerContato(index: number) {
        this.contatos.splice(index, 1);
    }    
}