import promptSync from "prompt-sync"
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
  public juros = 1.01; //Juros de 0,1% ao dia
  novoUsuario(usuario: IUsuario) {
    const usuarioExiste: IUsuario | undefined = this.usuarios.find(element => element === usuario);
    if(usuarioExiste === undefined){
      this.usuarios.push(usuario);
      console.log(`Usuário '${usuario.nome}' foi criado!`);
    }
    else{
      console.log(`Usuário '${usuario.nome}' já existe no sistema!`);
    }
  }
  novoEmprestimo(emprestimo: IEmprestimo) {
    const emprestimoExiste: IEmprestimo | undefined = this.emprestimos.find(element => element === emprestimo);
    if(emprestimoExiste === undefined){
      this.emprestimos.push(emprestimo);
      console.log("Empréstimo criado!");
    }
    else{
      console.log("Empréstimo já existe no sistema.");
    }
  }
  obterEmprestimos(nm_credor: string, nm_devedor: string): void {
    const listaEmprestimos: IEmprestimo[] = this.emprestimos.filter(
      (element) =>
        element.credor.nome === nm_credor && element.devedor.nome === nm_devedor
    );
    listaEmprestimos.forEach((element, index) => {
      console.log(
        `Valor do juros da posição ${index+1} empréstimo de ${element.credor.nome} e ${
          element.devedor.nome
        } com valor igual a ${element.valor} R$ = ${this.obterValorAtualizado(
          element.valor,
          element.data
        )}`
      );
    });
    if(listaEmprestimos.length === 0){
      console.log("Nenhum empréstimo encontrado.");
    }
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
    const emprestimoExiste: IEmprestimo | undefined = this.emprestimos.find(element => element === slc_emprestimo)
    if (userExists !== undefined && emprestimoExiste !== undefined) {
      const index: number = this.emprestimos.findIndex(
        (element) => element === slc_emprestimo
      );
      console.log(
        `Valor do ${index+1}° empréstimo pago: ${this.obterValorAtualizado(
          slc_emprestimo.valor,
          slc_emprestimo.data
        )} R$`
      );
      this.emprestimos.splice(index, 1);
    }
    else{
      console.log("Emprestimo não existe ou senha do credor inválida!");
    }
  }
}

const sistema = new Sistema();

sistema.novoUsuario(new Usuario("Joao", "468"));
sistema.novoUsuario(new Usuario("Antonio", "897"));
sistema.novoUsuario(new Usuario("Maria", "547"));
sistema.novoUsuario(new Usuario("Jose", "123"));
sistema.novoEmprestimo(new Emprestimo(new Date("2023-09-03"), 10, sistema.usuarios[0], sistema.usuarios[2]))
sistema.novoEmprestimo(new Emprestimo(new Date("2023-09-04"), 12, sistema.usuarios[1], sistema.usuarios[2]))
sistema.novoEmprestimo(new Emprestimo(new Date("2023-09-04"), 5, sistema.usuarios[1], sistema.usuarios[3]))
sistema.novoEmprestimo(new Emprestimo(new Date("2023-09-05"), 3, sistema.usuarios[1], sistema.usuarios[2]))
sistema.novoEmprestimo(new Emprestimo(new Date("2023-09-05"), 18, sistema.usuarios[0], sistema.usuarios[2]))

const prompt = promptSync()

console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")
console.log("")

console.log("Bem vindo ao Sistema de Empréstimo Gladious-Spei")
let loop: string = "sim"
while(loop === "sim"){
console.log("Para realizar o pagamento informe a baixo o nome do credor e do devedor: ");
let credor: string = prompt("Credor: ")
let devedor: string = prompt("Devedor: ")
sistema.obterEmprestimos(credor, devedor)
let pagamentoIndex: string = prompt("Selecione o número do empréstimo a pagar: ")
let senhaCredor: string = prompt("Informe a senha do credor: ");
sistema.pagarEmprestimo(sistema.emprestimos[Number(pagamentoIndex)], senhaCredor)
loop = prompt("Deseja realizar outro pagamento? (sim ou nao): ")
if(loop === "nao"){
  break;
  } 
}

//Senha: 2963
