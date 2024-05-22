import promptSync from "prompt-sync"
import { Usuario, Emprestimo, sistema} from "./emprestimo";

const prompt = promptSync()

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