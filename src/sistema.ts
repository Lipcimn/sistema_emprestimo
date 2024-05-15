//Old code

import { v4 as uuidv4 } from "uuid";

class Usuario {
  public id: string;
  public nome: string;
  private senha: string;
  constructor(nome: string, senha: string) {
    this.id = uuidv4();
    this.nome = nome;
    this.senha = senha;
  }
}

class Emprestimo {
  public id: string;
  public data: string;
  public valor: number;
  public credor: Usuario;
  public devedor: Usuario;
  constructor(data: string, valor: number, credor: Usuario, devedor: Usuario) {
    if (credor === devedor) {
      throw new Error("Credor e Devedor devem ser usuários diferentes");
    } else {
      this.id = uuidv4();
      this.data = data;
      this.valor = valor;
      this.credor = credor;
      this.devedor = devedor;
    }
  }
}

class Sistema {
  public listaUsuario: Usuario[] = [];
  public listaEmprestimo: Emprestimo[] = [];
  novoUsuario(nome: string, senha: string): void {
    const novoUsuario = new Usuario(
      nome.toLocaleLowerCase(),
      senha.toLocaleLowerCase()
    );
    this.listaUsuario.push(novoUsuario);
  }
  novoEmprestimo(
    data: string,
    valor: number,
    credor: string,
    devedor: string
  ): void {
    try {
      const credorIndex = this.listaUsuario.findIndex(
        (element) => element.nome === credor
      );
      const devedorIndex = this.listaUsuario.findIndex(
        (element) => element.nome === devedor
      );
      const novoEmprestimo = new Emprestimo(
        data,
        valor,
        this.listaUsuario[credorIndex],
        this.listaUsuario[devedorIndex]
      );
      this.listaEmprestimo.push(novoEmprestimo);
    } catch (error) {
      console.log(error);
    }
  }
  pagarEmprestimo(id: string): void {
    try {
      const index = this.listaEmprestimo.findIndex(
        (element) => element.id === id
      );
      this.listaEmprestimo.splice(index, 1);
    } catch (error) {
      console.log(`Não foi possível encontrar o id: ${id}`);
      console.log(error);
    }
  }
}

const sistema = new Sistema();
sistema.novoUsuario("pedro", "123");
sistema.novoUsuario("maria", "456");
sistema.novoUsuario("joao", "789");
sistema.novoUsuario("jose", "123");
sistema.novoUsuario("ana", "456");
sistema.novoUsuario("carlos", "789");
sistema.novoEmprestimo("01/01/2022", 100, "pedro", "maria");
sistema.novoEmprestimo("01/01/2022", 200, "maria", "joao");
sistema.novoEmprestimo("01/01/2022", 300, "joao", "jose");
sistema.novoEmprestimo("01/01/2022", 400, "jose", "ana");
console.log(sistema.listaUsuario);
console.log(sistema.listaEmprestimo);
console.log(
  `Quantidade de usuários no sistema: ${sistema.listaUsuario.length}`
);
console.log(
  `Quantidade de empréstimos no sistema: ${sistema.listaEmprestimo.length}`
);
