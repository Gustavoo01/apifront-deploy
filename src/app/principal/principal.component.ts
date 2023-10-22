import { Component } from '@angular/core';
import { Pessoa } from '../model/Pessoa';
import { PessoaService } from '../services/pessoa.service';
import { Contato } from '../model/Contato';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
  pessoa = new Pessoa();
  btnCadastro:boolean = true;
  tabela:boolean = true;
  pessoas:Pessoa[] = [];
  contato: Contato = new Contato();
  contatos: Contato[] = [];

  constructor(private servico:PessoaService){}

  selecionar():void{
    this.servico.selecionar().subscribe(retorno => this.pessoas = retorno);
  }

  adicionarContato() {
    this.pessoa.contatos.push(this.contato);
    this.contato = new Contato();
  }

  cadastrar():void{
    this.pessoa.cpf = this.formatarCPF(this.pessoa.cpf);
    this.servico.cadastrar(this.pessoa)
    .subscribe(retorno => {
      this.pessoas.push(retorno);
      this.pessoa = new Pessoa();
      alert('Pessoa Cadastrada com sucesso!');
    },
    error => {
      if (error.error && error.error.message) {
        alert('Erro ao cadastrar: ' + error.error.message);
      } else {
        alert('Erro desconhecido ao cadastrar: ' + error.message);
      }
    })
  }

  selecionarPessoa(posicao:number):void
  {
    this.pessoa = this.pessoas[posicao];
    this.btnCadastro = false;
    this.tabela = false;
  }

  editar():void{
    this.servico.editar(this.pessoa)
    .subscribe(retorno => {
      let posicao = this.pessoas.findIndex(obj => {
        return obj.id == retorno.id;
      });

      this.pessoas[posicao].contatos[posicao].pessoa_id = this.pessoa.id;

      this.pessoas[posicao] = retorno;

      this.pessoa = new Pessoa();

      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente alterado com sucesso!');
    },
    error => {
      if (error.error && error.error.message) {
        alert('Erro ao cadastrar: ' + error.error.message);
      } else {
        alert('Erro desconhecido ao cadastrar: ' + error.message);
      }
    });
  }

  editarPessoa() {
    this.servico.editar(this.pessoa)
    .subscribe(
      response => {
        alert('Cliente alterado!' + response);
      },
      error => {
        alert(console.log('Erro ao alterar' + error));
      }
    );
  }

  remover():void{
    this.servico.remover(this.pessoa.id)
    .subscribe(retorno => {
      let posicao = this.pessoas.findIndex(obj => {
        return obj.id == this.pessoa.id;
      });

      this.pessoas.splice(posicao, 1);

      this.pessoa = new Pessoa();

      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente removido com sucesso!');
    })
  }

  cancelar():void{
    this.pessoa = new Pessoa();
    this.btnCadastro = true;
    this.tabela = true;
  }

  cancelarContato():void{
    this.contato = new Contato();
    this.btnCadastro = true;
    this.tabela = true;
  }

  formatarCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
  
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  ngOnInit(){
    this.adicionarContato();
    this.selecionar();
  }
}