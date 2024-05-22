import { Usuario, Emprestimo, sistema} from "./emprestimo";

sistema.novoUsuario(new Usuario("pedro", "123"));
sistema.novoUsuario(new Usuario("maria", "456"));
sistema.novoUsuario(new Usuario("joao", "789"));
sistema.novoEmprestimo(
  new Emprestimo(new Date(), 100, sistema.usuarios[0], sistema.usuarios[1])
);
sistema.novoEmprestimo(
  new Emprestimo(new Date(), 100, sistema.usuarios[0], sistema.usuarios[1])
);
sistema.novoEmprestimo(
  new Emprestimo(new Date(), 100, sistema.usuarios[1], sistema.usuarios[2])
);
sistema.obterEmprestimos("pedro", "maria");
