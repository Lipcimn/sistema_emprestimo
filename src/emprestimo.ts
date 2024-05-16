interface IUsuario {
  nome: string;
  senha: string;
}

interface IEmprestimo {
  data: Date;
  valor: number;
  credor: IUsuario;
  devedor: IUsuario;
}

interface ISistema {
  usuarios: IUsuario[];
  emprestimos: IEmprestimo[];
  juros: number;
  novoUsuario: (usuario: IUsuario) => void;
  novoEmprestimo: (emprestimo: IEmprestimo) => void;
  obterEmprestimos: (nm_credor: string, nm_devedor: string) => void;
  obterValorAtualizado: (valor: number, data: Date) => number;
  pagarEmprestimo: (slc_emprestimo: IEmprestimo, id: string) => void;
}

class Usuario implements IUsuario {
  public nome: string;
  public senha: string;
  constructor(nome: string, senha: string) {
    this.nome = nome;
    this.senha = senha;
  }
}

class Emprestimo implements IEmprestimo {
  public data: Date;
  public valor: number;
  public credor: IUsuario;
  public devedor: IUsuario;
  constructor(data: Date, valor: number, credor: IUsuario, devedor: IUsuario) {
    if (credor === devedor) {
      throw new Error("Credor e Devedor devem ser usuários diferentes");
    } else {
      this.data = data;
      this.valor = valor;
      this.credor = credor;
      this.devedor = devedor;
    }
  }
}

class Sistema implements ISistema {
  public usuarios: IUsuario[] = [];
  public emprestimos: IEmprestimo[] = [];
  public juros = 1.01; //Juros de 1% ao dia
  novoUsuario(usuario: IUsuario) {
    const usuarioExiste: IUsuario | undefined = this.usuarios.find(
      (element) => element === usuario
    );
    if (usuarioExiste === undefined) {
      this.usuarios.push(usuario);
    } else {
      console.log("Usuário já existe no sistema.");
    }
  }
  novoEmprestimo(emprestimo: IEmprestimo) {
    this.emprestimos.push(emprestimo);
    console.log("Emprestimo efetuado com sucesso!");
  }
  obterEmprestimos(nm_credor: string, nm_devedor: string): void {
    const listaEmprestimos: IEmprestimo[] = this.emprestimos.filter(
      (element) =>
        element.credor.nome === nm_credor && element.devedor.nome === nm_devedor
    );
    this.emprestimos.forEach((element, index) => {
      if (listaEmprestimos.includes(element)) {
        console.log(
          `Valor do juros do empréstimo de ${element.credor.nome} e ${
            element.devedor.nome
          } com valor igual a ${element.valor} R$ = ${this.obterValorAtualizado(
            element.valor,
            element.data
          )} posição: ${index}`
        );
      }
    });
  }
  obterValorAtualizado(valor_inicial: number, data_inicial: Date): number {
    let valor_atualizado: number = valor_inicial;
    const data_atual = new Date(); //AAAA-MM-DD
    const diffTempo: number = data_atual.getTime() - data_inicial.getTime();
    const diffData: number = diffTempo / (1000 * 60 * 60 * 24);
    for (let i = 1; i < diffData; i++) valor_atualizado *= this.juros;
    return Number(valor_atualizado.toFixed(2));
  }
  pagarEmprestimo(slc_emprestimo: IEmprestimo, senha: string): void {
    const userExists: IEmprestimo | undefined = this.emprestimos.find(
      (element) => element.credor.senha === senha
    );
    if (userExists !== undefined) {
      const index: number = this.emprestimos.findIndex(
        (element) => element === slc_emprestimo
      );
      console.log(
        `Valor pago: ${this.obterValorAtualizado(
          slc_emprestimo.valor,
          slc_emprestimo.data
        )} R$`
      );
      this.emprestimos.splice(index, 1);
    }
  }
}

//Senha: 2963

export { Usuario, Emprestimo, Sistema };
