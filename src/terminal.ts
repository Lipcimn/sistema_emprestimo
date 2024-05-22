import promptSync from "prompt-sync";
import { Usuario, Emprestimo, sistema } from "./emprestimo";

const prompt = promptSync();

/*
 *  Criaçao dos usuários para teste do sistema
 */

sistema.novoUsuario(new Usuario("pedro", "123"));
sistema.novoUsuario(new Usuario("maria", "456"));
sistema.novoUsuario(new Usuario("joao", "789"));
sistema.novoUsuario(new Usuario("jose", "123"));
sistema.novoUsuario(new Usuario("ana", "456"));
sistema.novoUsuario(new Usuario("carlos", "789"));

console.log("Bem vindo ao Sistema de Empréstimo Gladious-Spei");
let loop: string = "sim";
while (loop === "sim") {
  console.log(
    "Para realizar um empréstimo, informe o nome do credor e do devedor: "
  );
  let credorNome: string = prompt("Credor: ");
  let devedorNome: string = prompt("Devedor: ");
  let valor: string = prompt("Insira o valor do emprestimo: ");
  let data: string = prompt(
    "Insira a data no empréstimo (formato AAAA-MM-DD): "
  );
  let senhaDevedor: string = prompt("Insira a senha do devedor: ");
  sistema.realizarEmprestimo(
    devedorNome,
    credorNome,
    Number(valor),
    data,
    senhaDevedor
  );
  console.log("Verificação do empréstimo...");
  sistema.obterEmprestimos(credorNome, devedorNome);
  let pagamentoIndex: string = prompt(
    "Selecione o número do empréstimo a pagar: "
  );
  let senhaCredor: string = prompt("Informe a senha do credor: ");
  sistema.pagarEmprestimo(
    sistema.emprestimos[Number(pagamentoIndex)],
    senhaCredor
  );
  loop = prompt("Deseja realizar outro pagamento? (sim ou nao): ");
  if (loop === "nao") {
    break;
  }
}
