import { Link } from "react-router";

export function NaoEncontrada() {
  return (
    <div>
      <h1>404</h1>
      <p>Página não encontrada.</p>
      <Link to="/">Voltar para o início</Link>
    </div>
  );
}
